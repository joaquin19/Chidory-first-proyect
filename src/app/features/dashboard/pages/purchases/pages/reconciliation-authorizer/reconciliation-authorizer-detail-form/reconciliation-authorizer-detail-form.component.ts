import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';

import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';
import {
  ReconciliationHeaderService, PurchaseOrderDetailService, SupplierInvoiceDetailService
} from '../../../services';
import { TaxService } from '@app/features/dashboard/pages/catalogs/services';
import { LocalImagesService } from '@app/shared/services/local-images.service';
import { AuthorizerService } from '@app/features/dashboard/pages/catalogs/services/authorizer.service';

@Component({
  selector: 'app-reconciliation-authorizer-detail-form',
  templateUrl: './reconciliation-authorizer-detail-form.component.html',
  styleUrls: ['./reconciliation-authorizer-detail-form.component.scss']
})
export class ReconciliationAuthorizerDetailFormComponent implements OnInit {

  public dataReceived: any;
  public reconciliation: any;
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

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authorizationProcessService: AuthorizationProcessService,
    private reconciliationHeaderService: ReconciliationHeaderService,
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    private supplierInvoiceDetailService: SupplierInvoiceDetailService,
    private toastr: ToastrService,
    private localImagesService: LocalImagesService,
    private authorizerService: AuthorizerService
  ) {
    this.dataReceived = {};
    this.reconciliation = {};
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
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headers = [
      { field: 'purchaseOrderHeaderId', header: 'NO. OC' },
      { field: 'articleName', header: 'DESCRIPCIÓN' },
      { field: 'quantity', header: 'CANTIDAD', format: FormatColumn.Quantity },
      { field: 'unitMeasureName', header: 'U/M' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', format: FormatColumn.Currency },
      { field: 'total', header: 'PRECIO TOTAL', format: FormatColumn.Currency }
    ];

    this.headersInvoice = [
      { field: 'quantity', header: 'CANTIDAD', format: FormatColumn.Quantity },
      { field: 'unitMeasure', header: 'U/M' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', format: FormatColumn.Currency },
      { field: 'total', header: 'PRECIO TOTAL', format: FormatColumn.Currency }
    ];

    this.showForm();
  }

  showForm(): void {
    this.dataReceived = this.config.data;
    this.getReconciliationHeaderById(this.dataReceived.valueId);
    this.getLogo();
    this.getLogoKR();
    this.getAuthorizers();
  }

  getReconciliationHeaderById(reconciliationId): void {
    this.reconciliationHeaderService.getReconciliationById(reconciliationId).subscribe(data => {
      this.reconciliation = data;
      this.reconciliation.receptionDate = moment(this.reconciliation.receptionDate, 'DD-MM-YYYY').format('DD/MM/YYYY');
      this.reconciliation.startPeriod =
        this.reconciliation.startPeriod !== null ? moment(`${this.reconciliation.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
      this.reconciliation.endPeriod =
        this.reconciliation.endPeriod !== null ? moment(`${this.reconciliation.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
      this.reconciliation.period = (this.reconciliation.startPeriod !== null)
        ? this.reconciliation.startPeriod + ' - ' + this.reconciliation.endPeriod : '';

      this.config.header = `Detalle Conciliación - Factura: ${this.reconciliation.numberInvoice}`;

      this.getPurchaseOrderDetailByReconciliation(reconciliationId);
      this.getAuthorizations(this.reconciliation.id);
    }, error => {
      this.toastr.error(error.message);
    });
  }

  getPurchaseOrderDetailByReconciliation(reconciliationId): void {
    this.purchaseOrderDetailService.getPurchaseOrderDetailByReconciliation(reconciliationId).subscribe(data => {
      this.listPurchaseOrderDetail = data;
      this.calculatePurchaseOrderTotal();
      this.getSupplierInvoiceDetailByReconciliationId(reconciliationId);
    }, error => {
      this.toastr.error(error.message);
    });
  }

  calculatePurchaseOrderTotal(): void {
    this.totalPurchaseOrder = 0;
    this.listPurchaseOrderDetail.forEach(element => {
      this.totalPurchaseOrder = this.totalPurchaseOrder;
    });
  }

  getSupplierInvoiceDetailByReconciliationId(reconciliationId): void {
    this.supplierInvoiceDetailService.getSupplierInvoiceDetailByReconciliationId(reconciliationId).subscribe(data => {
      this.listInvoiceDetail = data;
      this.listInvoiceDetail.forEach(element => {
        element.remark = true;
      });
      this.refreshRemark();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  calculateInvoiceTotal(): void {
    this.totalInvoice = 0;
    this.listInvoiceDetail.forEach(element => {
      this.totalInvoice = this.totalInvoice;
    });
  }

  refreshRemark(): void {
    let i = 0;
    const sizePurchaseOrder = this.listPurchaseOrderDetail.length;
    this.listInvoiceDetail.forEach(element => {
      if (i < sizePurchaseOrder) {
        element.remark = (this.listPurchaseOrderDetail[i].subTotal === element.subTotal) ? true : false;
      } else {
        element.remark = false;
      }
      i++;
    });
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

    authorizationsSave.processTypeId = ProcessType.Reconciliation;
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
    const dateCreateOn = (moment(`${this.reconciliation.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const purchaseOrderNamePDF =
      `C${this.reconciliation.id}(${this.reconciliation.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition = this.reconciliationHeaderService
      .getDocumentDefinition(this.listPurchaseOrderDetail, this.listInvoiceDetail, this.reconciliation, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
    pdfMake.createPdf(documentDefinition).download(purchaseOrderNamePDF);
  }

  showPDF(): void {
    const documentDefinition = this.reconciliationHeaderService
      .getDocumentDefinition(this.listPurchaseOrderDetail, this.listInvoiceDetail, this.reconciliation, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
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

}
