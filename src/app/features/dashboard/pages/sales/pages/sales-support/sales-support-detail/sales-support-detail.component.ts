import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { FormatColumn } from '@app/shared/enums';
import { TableListComponent } from '@app/shared/components/table-list/table-list.component';
import { SalesSupportDetailService, SalesSupportHeaderService } from '../../../services';
import { InvoicesService } from '@app/features/dashboard/pages/invoice/service';
import { ExchangeRateService } from '@app/features/dashboard/pages/catalogs/services';
import { OperationApiInvoice } from '@app/shared/enums/operation-api-invoice';
import { Company } from '@app/shared/enums/company';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sales-support-detail',
  templateUrl: './sales-support-detail.component.html',
  styleUrls: ['./sales-support-detail.component.scss']
})
export class SalesSupportDetailComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colDetailSupport: any;
  public listDetailSupport: any;
  public salesSupport: any;
  public currentUser: any;
  public titleExcel: string;
  public listMonths: any;
  public listExchangeRate: any;
  public exchangeRate: any;

  constructor(
    private toastr: ToastrService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public salesSupportDetailService: SalesSupportDetailService,
    private saleSupportHeaderService: SalesSupportHeaderService,
    private invoicesService: InvoicesService,
    private exchangeRateService: ExchangeRateService
  ) {
    this.colDetailSupport = [];
    this.listDetailSupport = [];
    this.titleExcel = 'Ventas Facturación';
    this.listMonths = [];
    this.listExchangeRate = [];
    this.exchangeRate = [];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.salesSupport = this.config.data;

    this.salesSupport.currencyFullName = `${this.salesSupport.currencyCode} - ${this.salesSupport.currencyName}`;

    this.colDetailSupport = [
      { width: 'col-w lg', field: 'shippingDate', header: 'FECHA', format: FormatColumn.Date },
      { width: 'col-w xl', field: 'folio', header: 'FOLIO REMISIÓN' },
      { width: 'col-w lg', field: 'partName', header: 'NO. PARTE' },
      { width: 'col-w lg', field: 'quantity', header: 'CANTIDAD', format: FormatColumn.Quantity },
      { width: 'col-w xl', field: 'salePrice', header: 'PRECIO UNITARIO', format: FormatColumn.Currency },
      { width: 'col-w lg', field: 'subTotal', header: 'SUB TOTAL', format: FormatColumn.Currency },
      { width: 'col-w lg', field: 'reference', header: 'REMISIÓN' },
      { width: 'col-w lg', field: 'observations', header: 'MODELO' }
    ];

    this.listMonths = [
      { number: 1, name: 'Enero' },
      { number: 2, name: 'Febrero' },
      { number: 3, name: 'Marzo' },
      { number: 4, name: 'Abril' },
      { number: 5, name: 'Mayo' },
      { number: 6, name: 'Junio' },
      { number: 7, name: 'Julio' },
      { number: 8, name: 'Agosto' },
      { number: 9, name: 'Septiembre' },
      { number: 10, name: 'Octubre' },
      { number: 11, name: 'Noviembre' },
      { number: 12, name: 'Diciembre' }
    ];

    this.getSaleSupportDetail(this.salesSupport.id);
    this.getExchangeRate();
  }

  exportExcel(): void {
    const reportParams: any = {};
    reportParams.customerName = this.salesSupport.customerName;
    const monthNumber = parseInt(moment(`${this.salesSupport.startDate}`, 'YYYY-MM-DD').format('M'), 0);
    reportParams.monthName = this.listMonths.filter(month => month.number === monthNumber)[0].name;
    reportParams.startDate = this.salesSupport.startDate;
    reportParams.endDate = this.salesSupport.endDate;
    reportParams.currencyCode = this.salesSupport.currencyCode;
    reportParams.purchaseOrder = this.salesSupport.purchaseOrder;

    const detailArray = [];
    for (const saleSupport of this.listDetailSupport) {
      detailArray.push({
        folio: saleSupport.id,
        shippingDate: saleSupport.shippingDate,
        partNumber: saleSupport.partNumber,
        partName: saleSupport.partName,
        quantity: saleSupport.quantity,
        salePrice: saleSupport.salePrice,
        subTotal: saleSupport.subTotal,
        taxes: saleSupport.total - saleSupport.subTotal,
        total: saleSupport.total,
        customerName: this.salesSupport.customerName,
        reference: saleSupport.reference,
        observations: saleSupport.observations
      });
    }
    reportParams.detail = detailArray;

    this.saleSupportHeaderService.getSaleSupportReport(reportParams).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `Soporte_Venta_${this.salesSupport.folio}.xlsx`);
      });

  }

  getSaleSupportDetail(salesSupportId) {
    this.salesSupportDetailService.getSaleSupportDetailByHeaderId(salesSupportId).subscribe(
      data => {
        this.listDetailSupport = data;
        this.listDetailSupport.map(support =>
          support.shippingDate = moment(`${support.shippingDate}`, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD')
        );
      });
  }

  getExchangeRate() {
    this.exchangeRateService.getExchangeRates().subscribe(
      data => {
        this.listExchangeRate = data;
        this.listExchangeRate.forEach(element => {
          element.changeDay = moment(element.changeDay, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD');
        });
        const toDay = moment(moment().toDate().toString()).format('YYYY-MM-DD');
        this.exchangeRate = this.listExchangeRate.filter(o => o.changeDay === toDay);
      });
  }

  sendPreFactura(): void {
    if (this.exchangeRate.length == 0 || this.exchangeRate == false) {
      this.toastr.warning(`No hay tipo de cambio registrado para el día de hoy, favor de ingresarlo en el catálogo Tipo de Cambio.`);
      return;
    }

    const apiInvoice = {
      // operacionId: OperationApiInvoice.PreFacturar,
      // soporteId: this.salesSupport.folio,
      // iva: Company.iva,
      // lugarExpedicion: Company.ZipCode,
      // tipoCambio: this.exchangeRate[0].exchangeRateValue
    }

    this.invoicesService.getInvoice(apiInvoice).subscribe(
      data => {
        const byteCharacters = atob(data.base64FacturaPdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        saveAs(blob, `${this.salesSupport.customerName}-Pre-Factura.pdf`);
      });
  }

}
