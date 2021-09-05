import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { FormatColumn } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { SalesSupportHeaderService } from '../../../services';
import { SalesSupportDetailComponent } from '../sales-support-detail/sales-support-detail.component';
import { AuthorizationSalesReportService } from '../../../services/authorization-sales-report.service';
import { SalesReportStatus } from '../../../../../../../shared/enums/sales-report-status';
import * as moment from 'moment';

@Component({
  selector: 'app-sales-support-list',
  templateUrl: './sales-support-list.component.html',
  styleUrls: ['./sales-support-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class SalesSupportListComponent implements OnInit, OnDestroy {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colSalesSupport: any;
  public listSalesSupport: any;
  public currentUser: any;
  public loadingTable: boolean;
  public ref: DynamicDialogRef;
  public salesReportStatus = SalesReportStatus;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    public messageService: MessageService,
    private saleSupportHeaderService: SalesSupportHeaderService,
    private authorizationSalesReportService: AuthorizationSalesReportService
  ) {
    this.colSalesSupport = [];
    this.listSalesSupport = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.colSalesSupport = [
      { width: 'col-w md', field: 'folio', header: 'Folio' },
      { width: 'col-w xl', field: 'createdOn', header: 'Fecha Creación', format: FormatColumn.Date },
      { width: 'col-w md', field: 'customerName', header: 'Cliente' },
      { width: 'col-w xl', field: 'createBy', header: 'Creado Por' },
      { width: 'col-w lg', field: 'total', header: 'Precio total', format: FormatColumn.Currency },
      { width: 'col-w md', field: 'saleSupportStatusName', header: 'Estatus' }
    ];

    this.getSalesSupport();
  }

  refreshData(): void {
    this.getSalesSupport();
  }

  getSalesSupport(): void {
    this.loadingTable = true;
    this.saleSupportHeaderService.getSaleSupports(this.currentUser.userName).subscribe(
      data => {
        this.listSalesSupport = data;
        console.log('listSalesSupport', this.listSalesSupport);
        this.listSalesSupport.forEach(element => {
          element.edit = (element.saleSupportStatusId === this.salesReportStatus.Created
            || element.saleSupportStatusId === this.salesReportStatus.Rejected) ? true : false;
          element.sendAuthorize = (element.saleSupportStatusId === this.salesReportStatus.Created
            || element.saleSupportStatusId === this.salesReportStatus.Rejected) ? true : false;
          element.delete = (element.saleSupportStatusId === this.salesReportStatus.Created
            || element.saleSupportStatusId === this.salesReportStatus.Rejected) ? true : false;
          element.createdOn = moment(element.createdOn, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD')
        });
        this.loadingTable = false;
      });
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.colSalesSupport) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Soporte de Ventas`, true, headersExcel);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  deleteItem(event): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de borrar el soporte de venta <strong>${event.folio}</strong>?`,
      header: 'Borrar Soporte de Venta',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.deleteSaleSupport(event.id);
      }
    });
  }

  deleteSaleSupport(saleSupportId): void {
    this.saleSupportHeaderService.deleteSaleSupport(saleSupportId, this.currentUser.userName).subscribe(
      data => {
        this.toastr.success('Soporte de venta eliminada correctamente.');
        this.refreshData();
      });
  }

  detailItem(event): void {
    this.ref = this.dialogService.open(SalesSupportDetailComponent, {
      data: event,
      header: 'Detalle Soporte de Venta',
      width: '95%',
      contentStyle: { 'max-height': '600px', overflow: 'auto' },
      baseZIndex: 10000
    });
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/sales/sales-report/editSalesReport/${event.id}`]);
    console.log('editItem', event.id);
  }

  sendAuthorizeItem(event): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de enviar a autorizar el Reporte de Venta <strong>${event.folio}</strong>?`,
      header: 'Enviar a Autorización el Reporte de Venta',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-send',
      acceptButtonStyleClass: 'p-button-success',
      rejectVisible: false,
      accept: () => {
        this.sendAuthorization(event.id);
      }
    });
  }

  sendAuthorization(id): void {
    const purchaseOrderSave: any = {};
    purchaseOrderSave.id = id;
    purchaseOrderSave.createBy = this.currentUser.userName;

    this.authorizationSalesReportService.upSaleSupportSendAuthorization(purchaseOrderSave).subscribe(
      data => {
        this.toastr.success('Reporte de Venta enviada a autorizar correctamente.');
        this.refreshData();
      });
  }

  sendPreInvoive(event): void {
    console.log("envio a pre factura");
  }

}
