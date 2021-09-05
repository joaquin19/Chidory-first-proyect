import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { TaxService } from '@app/features/dashboard/pages/catalogs/services';
import { AuthorizerService } from '@app/features/dashboard/pages/catalogs/services/authorizer.service';
import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';
import { LocalImagesService } from '@app/shared/services/local-images.service';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import pdfMake from 'pdfmake/build/pdfmake';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SalesSupportHeaderService } from '../../../services/sales-support-header.service';
import { SalesSupportDetailService } from '../../../services/sales-support-detail.service';

@Component({
  selector: 'app-authorization-sales-report-detail',
  templateUrl: './authorization-sales-report-detail.component.html',
  styleUrls: ['./authorization-sales-report-detail.component.scss']
})
export class AuthorizationSalesReportDetailComponent implements OnInit {

  public dataReceived: any;
  public salesReport: any;
  public listSalesReportDetail: any;
  public listSalesReportDocuments: any;
  public listTaxesDetail: any;
  public listTaxesAdded: any;
  public listTaxes: any;
  public headers: any;
  public observations: string;
  public requiredObservation: boolean;
  public authorizationStatusAuthorized: AuthorizationStatus;
  public authorizationStatusReject: AuthorizationStatus;
  public authorizationStatusId: AuthorizationStatus;
  public currentUser: any;
  public total: any;
  public subTotal: any;
  public quantity: any;
  public logo: any;
  public logoKR: any;
  public responsiveOptions: any;
  public processTypeId = ProcessType.SalesReport;
  public listAuthorization: any;
  public listAuthorizers: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authorizationProcessService: AuthorizationProcessService,
    private salesReportHeaderService: SalesSupportHeaderService,
    private taxService: TaxService,
    private toastr: ToastrService,
    private salesReportDetailService: SalesSupportDetailService,
    private localImagesService: LocalImagesService,
    private authorizerService: AuthorizerService
  ) {
    this.dataReceived = {};
    this.salesReport = {};
    this.listSalesReportDetail = [];
    this.listSalesReportDocuments = [];
    this.listTaxes = [];
    this.headers = [];
    this.observations = '';
    this.requiredObservation = false;
    this.authorizationStatusAuthorized = AuthorizationStatus.Authorized;
    this.authorizationStatusReject = AuthorizationStatus.Rejected;
    this.authorizationStatusId = AuthorizationStatus.None;
    this.total = 0;
    this.subTotal = 0;
    this.quantity = 0;
    this.logo = '';
    this.logoKR = '';
    this.listAuthorization = [];
    this.listAuthorizers = [];

    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
      { breakpoint: '768px', numVisible: 2, numScroll: 2 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headers = [
      { field: 'partNumber', header: 'NO. PARTE', width: 'col-w md' },
      { field: 'folio', header: 'fOLIO', width: 'col-w lg' },
      { field: 'quantity', header: 'CANTIDAD', width: 'col-w md', format: FormatColumn.Quantity },
      { field: 'observations', header: 'OBSERVACIONES', width: 'col-w xxl' },
      { field: 'shippingDate', header: 'FECHA DE ENTREGA', width: 'col-w lg', format: FormatColumn.Date },
      { field: 'subTotal', header: 'PRECIO TOTAL', width: 'col-w md', format: FormatColumn.Currency }
    ];

    this.showForm();
  }

  showForm(): void {
    this.dataReceived = this.config.data;
    this.getSalesReportById(this.dataReceived.valueId);
    this.getSalesReportDocuments(this.dataReceived.valueId);
    this.getLogo();
    this.getLogoKR();
    this.getAuthorizers();
  }

  getSalesReportById(salesReportId): void {
    this.salesReportHeaderService.getSaleSupportById(salesReportId).subscribe(
      data => {
        this.salesReport = data;
        this.salesReport.customerName =
          this.salesReport.customerName !== null ? this.salesReport.customerName : '';
        this.salesReport.supplierPhone =
          this.salesReport.supplierPhone !== null ? this.salesReport.supplierPhone : 'N/A';
        this.salesReport.notes =
          this.salesReport.notes !== null ? this.salesReport.notes : '';
        this.salesReport.observations =
          this.salesReport.observations !== null ? this.salesReport.observations : '';
        this.salesReport.startDate =
          this.salesReport.startDate !== null ? moment(`${this.salesReport.startDate}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.salesReport.endDate =
          this.salesReport.endDate !== null ? moment(`${this.salesReport.endDate}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.salesReport.estimatedDate =
          this.salesReport.endDate !== null ? moment (`${this.salesReport.endDate}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.salesReport.createdOn =
          this.salesReport.createdOn !== null ? moment (`${this.salesReport.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.salesReport.period =
          this.salesReport.startDate + ' - ' + this.salesReport.endDate;
        this.salesReport.currencyFullName =
          this.salesReport.currencyCode + ' - ' + this.salesReport.currencyName;
        this.getSalesReportDetail(this.salesReport.id);
        this.getAuthorizations(this.salesReport.id);
      });
  }

  getSalesReportDetail(salesReportHeaderId): void {
    this.salesReportDetailService.getSaleSupportDetailByHeaderId(salesReportHeaderId).subscribe(
      data => {
        this.listSalesReportDetail = data;
        this.getTaxes();
      }, error => {
        this.toastr.error(error.message);
    });
  }

  getTaxes(): void {
    this.taxService.getTaxes().subscribe(
      data => {
        this.listTaxes = data;
        for (const item of this.listTaxes) {
          item.amount = 0;
        }
        this.calculationTotal();
      });
  }

  calculationTotal(): void {
    this.total = 0;
    this.subTotal = 0;
    for (const item of this.listSalesReportDetail) {
      this.subTotal = this.subTotal + item.subTotal;
      this.total = this.total + item.total;
      this.quantity = this.quantity + item.quantity;
    }
    this.calculationTaxes();
  }

  calculationTaxes(): void {
    for (const itemT of this.listTaxes) {
      itemT.amount = 0;
    }
    for (const itemD of this.listTaxesDetail) {
      for (const itemT of this.listTaxes) {
        if (itemD.taxId === itemT.id) {
          itemT.amount = itemT.amount + itemD.amount;
        }
      }
    }
    this.listTaxesAdded = this.listTaxes.filter(({ id }) => this.listTaxesDetail.some(o => o.taxId === id));
  }

  closeForm(resp): void {
    this.ref.close(resp);
  }

  processAuthorization(authorizationStatusId) {
    this.authorizationStatusId = authorizationStatusId;

    switch (authorizationStatusId) {
      case AuthorizationStatus.Authorized:
        this.requiredObservation = false;
        break;
      case AuthorizationStatus.Rejected:
        this.requiredObservation = true;
        break;
    }

    if (this.observations === '' && this.authorizationStatusId === AuthorizationStatus.Rejected) {
      return false;
    }

    const authorizationsSave: any = {};

    authorizationsSave.processTypeId = ProcessType.SalesReport;
    authorizationsSave.authorizationStatusId = this.authorizationStatusId;
    authorizationsSave.createBy = this.currentUser.userName;
    authorizationsSave.observation = this.observations;

    const detailArray = [];

    detailArray.push({
      id: this.dataReceived.id,
      valueId: this.dataReceived.valueId
    });

    authorizationsSave.detail = detailArray;

    this.authorizationProcessService.updateAuthorizationProcess(authorizationsSave).subscribe(
      data => {
        this.closeForm(this.authorizationStatusId);
      });
  }

  downloadPDF(): void {
    const dateCreateOn = (moment(`${this.salesReport.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const salesReportNamePDF = `P${this.salesReport.id}(${this.salesReport.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.salesReportHeaderService.getDocumentDefinition(this.headers, this.listSalesReportDetail,
        this.salesReport, this.listTaxesAdded, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
    pdfMake.createPdf(documentDefinition).download(salesReportNamePDF);
  }

  showPDF(): void {
    const documentDefinition =
      this.salesReportHeaderService.getDocumentDefinition(this.headers, this.listSalesReportDetail,
        this.salesReport, this.listTaxesAdded, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
    pdfMake.createPdf(documentDefinition).open();
  }

  getLogo(): void {
    this.localImagesService.getLogo().subscribe(res => {
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(res);
      reader.onloadend = () => {
        this.logo = reader.result;
      };
    });
  }

  getLogoKR(): void {
    this.localImagesService.getLogoKR().subscribe(res => {
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(res);
      reader.onloadend = () => {
        this.logoKR = reader.result;
      };
    });
  }

  getSalesReportDocuments(salesReportId): void {
    // this.salesReportDocumentService.getSalesReportDocumentsByHeaderId(salesReportId).subscribe(
    //   data => {
    //     this.listsalesReportDocuments = data;
    //   });
  }

  downloadDocument(document): void {
    // this.salesReportDocumentService.downloadsalesReportDocument(document).subscribe(
    //   data => {
    //     const blob: any = new Blob([data], { type: 'application/octet-stream' });
    //     saveAs(blob, `${document.userName}`);
    //   });
  }

  getAuthorizations(salesReportId): void {
    this.authorizationProcessService.getAuthorizations(this.processTypeId, null, 0, salesReportId).subscribe(
      data => {
        this.listAuthorization = data;
      });
  }

  getAuthorizers(): void {
    this.authorizerService.getAuthorizerByProcessTypeId(this.processTypeId).subscribe(
      data => {
        this.listAuthorizers = data;
      });
  }

}
