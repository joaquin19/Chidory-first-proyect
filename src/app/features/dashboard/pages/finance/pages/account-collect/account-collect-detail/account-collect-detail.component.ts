import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import pdfMake from 'pdfmake/build/pdfmake';
import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';
import { TaxService } from '@app/features/dashboard/pages/catalogs/services';
import { ToastrService } from 'ngx-toastr';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import * as moment from 'moment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-account-collect-detail',
  templateUrl: './account-collect-detail.component.html',
  styleUrls: ['./account-collect-detail.component.scss']
})
export class AccountCollectDetailComponent implements OnInit {

  public dataReceived: any;
  public accountCollect: any;
  public listAccountCollectDetail: any;
  public listAccountCollectDocuments: any;
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
  public responsiveOptions: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authorizationProcessService: AuthorizationProcessService,
    // private accountCollectHeaderService: any,
    // private accountCollectDetailService: any,
    // private accountCollectDocumentService: any,
    // private accountCollectDetailTaxService: any,
    private taxService: TaxService,
    private toastr: ToastrService
  ) {
    this.dataReceived = {};
    this.accountCollect = {};
    this.listAccountCollectDetail = [];
    this.listAccountCollectDocuments = [];
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
    this.getAccountCollectById(this.dataReceived.valueId);
    this.getAccountCollectDocuments(this.dataReceived.valueId);
    this.getLogo();
  }

  getAccountCollectById(accountCollectId): void {
    // this.accountCollectHeaderService.getAccountCollectById(accountCollectId).subscribe(
    //   data => {
    //     this.accountCollect = data;
    //     this.accountCollect.supplierContactName =
    //       this.accountCollect.supplierContactName !== null ? this.accountCollect.supplierContactName : '';
    //     this.accountCollect.supplierPhone =
    //       this.accountCollect.supplierPhone !== null ? this.accountCollect.supplierPhone : '';
    //     this.accountCollect.notes =
    //       this.accountCollect.notes !== null ? this.accountCollect.notes : '';
    //     this.accountCollect.observations =
    //       this.accountCollect.observations !== null ? this.accountCollect.observations : '';
    //     this.accountCollect.startPeriod =
    //       this.accountCollect.startPeriod !== null ? moment(`${this.accountCollect.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
    //     this.accountCollect.endPeriod =
    //       this.accountCollect.endPeriod !== null ? moment(`${this.accountCollect.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
    //     this.accountCollect.period =
    //       this.accountCollect.startPeriod + ' - ' + this.accountCollect.endPeriod;
    //     this.accountCollect.currencyFullName =
    //       this.accountCollect.currencyCode + ' - ' + this.accountCollect.currencyName;
    //     this.getAccountCollectDetail(this.accountCollect.id);
    //   });
  }

  getAccountCollectDetail(accountCollectHeaderId): void {
    // this.accountCollectDetailService.getAccountCollectDetailByHeaderId(accountCollectHeaderId).subscribe(
    //   data => {
    //     this.listAccountCollectDetail = data;
    //     this.getAccountCollectDetailTaxByHeader(accountCollectHeaderId);
    //   }, error => {
    //     this.toastr.error(error.message);
    //   });
  }

  getAccountCollectDetailTaxByHeader(accountCollectId): void {
    // this.accountCollectDetailTaxService.getAccountCollectDetailTaxByPOH(accountCollectId).subscribe(
    //   data => {
    //     this.listTaxesDetail = data;
    //     this.getTaxes();
    //   });
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
    for (const item of this.listAccountCollectDetail) {
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

    authorizationsSave.processTypeId = ProcessType.AccountCollect;
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
    const dateCreateOn = (moment(`${this.accountCollect.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const accountCollectNamePDF = `P${this.accountCollect.id}(${this.accountCollect.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    // const documentDefinition =
    //   this.accountCollectHeaderService.getDocumentDefinition(this.headers, this.listAccountCollectDetail,
    //     this.accountCollect, this.listTaxesAdded, this.logo);
    // pdfMake.createPdf(documentDefinition).download(accountCollectNamePDF);
  }

  showPDF(): void {
    // const documentDefinition =
    //   this.accountCollectHeaderService.getDocumentDefinition(this.headers, this.listAccountCollectDetail,
    //     this.accountCollect, this.listTaxesAdded, this.logo);
    // pdfMake.createPdf(documentDefinition).open();
  }

  getLogo(): void {
    // this.accountCollectHeaderService.getLogo().subscribe(res => {
    //   const reader = new FileReader();
    //   const url64 = reader.readAsDataURL(res);
    //   reader.onloadend = () => {
    //     this.logo = reader.result;
    //   };
    // });
  }

  getAccountCollectDocuments(accountCollectId): void {
    // this.accountCollectDocumentService.getAccountCollectDocumentsByHeaderId(accountCollectId).subscribe(
    //   data => {
    //     this.listAccountCollectDocuments = data;
    //   });
  }

  downloadDocument(document): void {
    // this.accountCollectDocumentService.downloadAccountCollectDocument(document).subscribe(
    //   data => {
    //     const blob: any = new Blob([data], { type: 'application/octet-stream' });
    //     saveAs(blob, `${document.userName}`);
    //   });
  }
}
