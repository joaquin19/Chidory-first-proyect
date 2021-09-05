import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

import { LocalImagesService } from '@app/shared/services/local-images.service';
import { AuthorizerService } from '@app/features/dashboard/pages/catalogs/services/authorizer.service';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import {
  PurchaseOrderDetailService, ReconciliationHeaderService, SupplierInvoiceDetailService,
  SupplierInvoiceDocumentService
} from '../../../services';
import { DownloadFileService } from '@app/shared/services/download-file.service';

@Component({
  selector: 'app-reconciliation-detail-form',
  templateUrl: './reconciliation-detail-form.component.html',
  styleUrls: ['./reconciliation-detail-form.component.scss']
})
export class ReconciliationDetailFormComponent implements OnInit {

  public reconciliation: any;
  public cols: any;
  public colsInvoice: any;
  public purchaseOrders: any;
  public invoiceDetail: any;
  public pageRedirect: string;
  public dataReceived: any;
  public listPurchaseOrderDetail: any;
  public listInvoiceDetail: any;
  public headers: any;
  public headersInvoice: any;
  public observations: string;
  public requiredObservation: boolean;
  public authorizationStatusAuthorized: AuthorizationStatus;
  public authorizationStatusReject: AuthorizationStatus;
  public authorizationStatusId: AuthorizationStatus;
  public currentUser: any;
  public totalPurchaseOrder: any;
  public totalInvoice: any;
  public logo: any;
  public logoKR: any;
  public processTypeId = ProcessType.Reconciliation;
  public listAuthorization: any;
  public listAuthorizers: any;
  public authorizedStatus: AuthorizationStatus.Authorized;
  public data: any;
  public listDocuments: any;
  public fileXML: number;
  public filePDF: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reconciliationHeaderService: ReconciliationHeaderService,
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    private supplierInvoiceDetailService: SupplierInvoiceDetailService,
    private localImagesService: LocalImagesService,
    private authorizerService: AuthorizerService,
    private authorizationProcessService: AuthorizationProcessService,
    private supplierInvoiceDocumentService: SupplierInvoiceDocumentService,
    private downloadFileService: DownloadFileService,
    private toastr: ToastrService
  ) {
    this.reconciliation = {};
    this.cols = [];
    this.colsInvoice = [];
    this.purchaseOrders = [];
    this.invoiceDetail = [];
    this.pageRedirect = "/dashboard/purchases/requisitions";
    this.dataReceived = {};
    this.listPurchaseOrderDetail = [];
    this.listInvoiceDetail = [];
    this.headers = [];
    this.headersInvoice = [];
    this.observations = '';
    this.requiredObservation = false;
    this.authorizationStatusAuthorized = AuthorizationStatus.Authorized;
    this.authorizationStatusReject = AuthorizationStatus.Rejected;
    this.authorizationStatusId = AuthorizationStatus.None;
    this.totalPurchaseOrder = 0;
    this.totalInvoice = 0;
    this.logo = '';
    this.logoKR = '';
    this.listAuthorization = [];
    this.listAuthorizers = [];
    this.listDocuments = [];
    this.fileXML = 1;
    this.filePDF = 2;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headers = [
      { field: 'purchaseOrderHeaderId', header: 'NO. OC', width: 'col-w md' },
      { field: 'articleName', header: 'DESCRIPCIÓN', width: 'col-w xl' },
      { field: 'quantity', header: 'CANTIDAD', format: FormatColumn.Quantity, width: 'col-w sm' },
      { field: 'unitMeasureName', header: 'U/M', width: 'col-w md' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', format: FormatColumn.Currency, width: 'col-w md' },
      { field: 'total', header: 'PRECIO TOTAL', format: FormatColumn.Currency, width: 'col-w md' }
    ];

    this.headersInvoice = [
      { field: 'quantity', header: 'CANTIDAD', format: FormatColumn.Quantity, width: 'col-w sm' },
      { field: 'unitMeasure', header: 'U/M', width: 'col-w md' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', format: FormatColumn.Currency, width: 'col-w md' },
      { field: 'total', header: 'PRECIO TOTAL', format: FormatColumn.Currency, width: 'col-w md' }
    ];

    this.showForm();
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'detailReconciliation':
            this.getReconciliationHeaderById(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
    this.getLogo();
    this.getLogoKR();
    this.getAuthorizers();
  }

  getReconciliationHeaderById(reconciliationId) {
    this.reconciliationHeaderService.getReconciliationById(reconciliationId).subscribe(data => {
      this.reconciliation = data;
      this.reconciliation.receptionDate = moment(this.reconciliation.receptionDate, 'DD-MM-YYYY').format('DD/MM/YYYY');
      this.reconciliation.startPeriod =
        this.reconciliation.startPeriod !== null ? moment(`${this.reconciliation.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
      this.reconciliation.endPeriod =
        this.reconciliation.endPeriod !== null ? moment(`${this.reconciliation.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
      this.reconciliation.period = (this.reconciliation.startPeriod !== null) ? this.reconciliation.startPeriod + ' - ' + this.reconciliation.endPeriod : '';

      this.getPurchaseOrdersDetailByReconciliation(reconciliationId);
      this.getAuthorizations(this.reconciliation.id);
      if (this.reconciliation.supplierInvoiceHeaderId) {
        this.getDocumentsSupplierInvoice(this.reconciliation.supplierInvoiceHeaderId);
      }
    }, error => {
      this.toastr.error(error.message);
    });
  }

  getPurchaseOrdersDetailByReconciliation(reconciliationId) {
    this.purchaseOrderDetailService.getPurchaseOrderDetailByReconciliation(reconciliationId).subscribe(data => {
      this.listPurchaseOrderDetail = data;
      this.calculatePurchaseOrderTotal();
      this.getSupplierInvoiceDetailByReconciliationId(reconciliationId);
    }, error => {
      this.toastr.error(error.message);
    });
  }

  calculatePurchaseOrderTotal() {
    this.totalPurchaseOrder = 0;
    this.listPurchaseOrderDetail.forEach(element => {
      this.totalPurchaseOrder = this.totalPurchaseOrder;
    });
  }

  getSupplierInvoiceDetailByReconciliationId(reconciliationId) {
    this.supplierInvoiceDetailService.getSupplierInvoiceDetailByReconciliationId(reconciliationId).subscribe(data => {
      this.listInvoiceDetail = data;
      this.listInvoiceDetail.forEach(element => {
        element.remarck = true;
      });
      this.refreshRemark();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  calculateInvoiceTotal() {
    this.totalInvoice = 0;
    this.listInvoiceDetail.forEach(element => {
      this.totalInvoice = this.totalInvoice;
    });
  }

  refreshRemark() {
    let i = 0;
    const sizePurchaseOrder = this.listPurchaseOrderDetail.length;
    this.listInvoiceDetail.forEach(element => {
      if (i < sizePurchaseOrder) {
        element.remarck = (this.listPurchaseOrderDetail[i].subTotal == element.subTotal) ? true : false;
      } else {
        element.remarck = false;
      }
      i++;
    });
  }

  downloadPDF() {
    const dateCreateOn = (moment(`${this.reconciliation.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const purchaseOrderNamePDF =
      `C${this.reconciliation.id}(${this.reconciliation.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition = this.reconciliationHeaderService
      .getDocumentDefinition(this.listPurchaseOrderDetail, this.listInvoiceDetail, this.reconciliation, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
    pdfMake.createPdf(documentDefinition).download(purchaseOrderNamePDF);
  }

  showPDF() {
    const documentDefinition = this.reconciliationHeaderService
      .getDocumentDefinition(this.listPurchaseOrderDetail, this.listInvoiceDetail, this.reconciliation, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
    pdfMake.createPdf(documentDefinition).open();
  }

  getLogo() {
    this.localImagesService.getLogo().subscribe(res => {
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(res);
      reader.onloadend = () => {
        this.logo = reader.result;
      }
    });
  }

  getLogoKR() {
    this.localImagesService.getLogoKR().subscribe(res => {
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(res);
      reader.onloadend = () => {
        this.logoKR = reader.result;
      }
    });
  }

  getAuthorizations(purchaseOrderId) {
    this.authorizationProcessService.getAuthorizations(this.processTypeId, null, this.authorizedStatus, purchaseOrderId).subscribe(
      data => {
        this.listAuthorization = data;
      });
  }

  getAuthorizers() {
    this.authorizerService.getAuthorizerByProcessTypeId(this.processTypeId).subscribe(
      data => {
        this.listAuthorizers = data;
      });
  }

  getDocumentsSupplierInvoice(supplierInvoiceHeaderId) {
    this.supplierInvoiceDocumentService.getSupplierInvoiceDocumentsByHeaderId(supplierInvoiceHeaderId).subscribe(
      data => {
        this.listDocuments = data;
      });
  }

  downloadFile(typeFile) {
    let file: any;

    switch (typeFile) {
      case 1:
        file = this.listDocuments.filter(o => o.userName.substring(
          o.userName.lastIndexOf('.') + 1, o.userName.length) === 'xml')[0];
        break;
      case 2:
        file = this.listDocuments.filter(o =>
          o.userName.substring(o.userName.lastIndexOf('.') + 1, o.userName.length) === 'pdf')[0];
        break;
    }

    this.downloadFileService.getFile(file).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${file.userName}`);
      });
  }

}
