import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { TaxService } from '@app/features/dashboard/pages/catalogs/services';
import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import pdfMake from 'pdfmake/build/pdfmake';
import { saveAs } from 'file-saver';
import { AccountPayableService } from '../../../service/account-payable.service';
import { PurchaseOrderDetailService, PurchaseOrderDetailTaxService, PurchaseOrderDocumentService, PurchaseOrderHeaderService } from '@app/features/dashboard/pages/purchases/services';
import { LocalImagesService } from '@app/shared/services/local-images.service';
import { AuthorizerService } from '@app/features/dashboard/pages/catalogs/services/authorizer.service';

@Component({
  selector: 'app-account-payable-detail',
  templateUrl: './account-payable-detail.component.html',
  styleUrls: ['./account-payable-detail.component.scss']
})
export class AccountPayableDetailComponent implements OnInit {

  public dataReceived: any;
  public accountPayable: any;
  public listAccountPayableDetail: any;
  public listAccountPayableDocuments: any;
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
  public listAuthorization: any;
  public listAuthorizers: any;
  public authorizedStatus: AuthorizationStatus.Authorized;
  public processTypeId = ProcessType.PurchaseOrder;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authorizationProcessService: AuthorizationProcessService,
    private purchaseOrderHeaderService: PurchaseOrderHeaderService,
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    private purchaseOrderDetailTaxService: PurchaseOrderDetailTaxService,
    private purchaseOrderDocumentService: PurchaseOrderDocumentService,
    private localImagesService: LocalImagesService,
    private authorizerService: AuthorizerService,
    //private accountPayabletHeaderService: accountPayabletHeaderService,
    // private accountPayabletDetailService: any,
    // private accountPayabletDocumentService: any,
    // private accountPayabletDetailTaxService: any,
    private taxService: TaxService,
    private toastr: ToastrService
  ) {
    this.dataReceived = {};
    this.accountPayable = {};
    this.listAccountPayableDetail = [];
    this.listAccountPayableDocuments = [];
    this.listTaxesDetail = [];
    this.listTaxesAdded = [];
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
      { field: 'code', header: 'NO. PARTE', width: 'col-w md' },
      { field: 'description', header: 'DESCRIPCIÓN', width: 'col-w xxxxl' },
      { field: 'quantity', header: 'CANTIDAD', width: 'col-w md', format: FormatColumn.Quantity },
      { field: 'unitMeasureName', header: 'U/M', width: 'col-w md' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', width: 'col-w lg', format: FormatColumn.Currency },
      { field: 'subTotal', header: 'PRECIO TOTAL', width: 'col-w md', format: FormatColumn.Currency }
    ];

    this.showForm();
  }

  showForm(): void {
    this.dataReceived = this.config.data;
    this.getAccountPayableById(this.dataReceived.id);
    this.getAccountPayableDocuments(this.dataReceived.id);
    this.getLogo();
  }

  getAccountPayableById(accountPayableId): void {
    this.purchaseOrderHeaderService.getPurchaseOrderById(accountPayableId).subscribe(
      data => {
        this.accountPayable = data;
        this.accountPayable.supplierContactName = this.accountPayable.supplierContactName !== null ? this.accountPayable.supplierContactName : '';
        this.accountPayable.supplierPhone = this.accountPayable.supplierPhone !== null ? this.accountPayable.supplierPhone : '';
        this.accountPayable.notes = this.accountPayable.notes !== null ? this.accountPayable.notes : '';
        this.accountPayable.observations = this.accountPayable.observations !== null ? this.accountPayable.observations : '';
        this.accountPayable.estimatedDate =
          this.accountPayable.estimatedDate !== null ? moment(`${this.accountPayable.estimatedDate}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.accountPayable.startPeriod =
          this.accountPayable.startPeriod !== null ? moment(`${this.accountPayable.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.accountPayable.endPeriod =
          this.accountPayable.endPeriod !== null ? moment(`${this.accountPayable.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.accountPayable.period =
          this.accountPayable.startPeriod + ' - ' + this.accountPayable.endPeriod;
        this.getAccountPayableDetail(accountPayableId);
      });
  }

  getAccountPayableDetail(accountPayableHeaderId): void {
    this.purchaseOrderDetailService.getPurchaseOrderDetailByHeaderId(accountPayableHeaderId).subscribe(
      data => {
        this.listAccountPayableDetail = data;
        this.getAccountPayableDetailTaxByHeader(accountPayableHeaderId);
        this.calculationTotal();
      });
  }

  getAccountPayableDetailTaxByHeader(accountPayableId): void {
    this.purchaseOrderDetailTaxService.getPurchaseOrderDetailTaxByPOH(accountPayableId).subscribe(
      data => {
        this.listTaxesDetail = data;
        this.getTaxes();
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
    this.quantity = 0;
    for (const item of this.listAccountPayableDetail) {
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

    authorizationsSave.processTypeId = ProcessType.AccountPayable;
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

  downloadPDF() {
    const dateCreateOn = (moment(`${this.accountPayable.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const accountPayableNamePDF = `P${this.accountPayable.id}(${this.accountPayable.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.purchaseOrderHeaderService.getDocumentDefinition(this.headers, this.listAccountPayableDetail,
        this.accountPayable, this.listTaxesAdded, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
    pdfMake.createPdf(documentDefinition).download(accountPayableNamePDF);
  }

  showPDF() {
    const documentDefinition =
      this.purchaseOrderHeaderService.getDocumentDefinition(this.headers, this.listAccountPayableDetail,
        this.accountPayable, this.listTaxesAdded, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
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

  getAccountPayableDocuments(purchaseOrderId) {
    this.purchaseOrderDocumentService.getPurchaseOrderDocumentsByHeaderId(purchaseOrderId).subscribe(
      data => {
        this.listAccountPayableDocuments = data;
      });
  }

  downloadDocument(document) {
    this.purchaseOrderDocumentService.downloadPurchaseOrderDocument(document).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${document.userName}`);
      });
  }

  getAuthorizations(purchaseOrderId) {
    console.log('purchaseOrderId: ', purchaseOrderId);
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
