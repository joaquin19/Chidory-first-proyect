import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { PurchaseOrderDetailService, PurchaseOrderDetailTaxService, PurchaseOrderHeaderService } from '@app/features/dashboard/pages/purchases/services';
import { Action, AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';
import * as moment from 'moment';
import { BankService, TaxService } from '@app/features/dashboard/pages/catalogs/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountPayableService } from '../../../service';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-account-payable-form',
  templateUrl: './account-payable-form.component.html',
  styleUrls: ['./account-payable-form.component.scss']
})
export class AccountPayableFormComponent implements OnInit {

  public dataHeader: any;
  public dataDetail: any;
  public headers: any;
  public observations: string;
  public requiredObservation: boolean;
  public authorizationStatusAuthorized: AuthorizationStatus;
  public authorizationStatusReject: AuthorizationStatus;
  public authorizationStatusId: AuthorizationStatus;
  public currentUser: any;
  public dataReceived: any;
  public accountPayable: any;
  public total: any;
  public subTotal: any;
  public quantity: any;
  public listAccountPayableDetail: any;
  public listTaxesDetail: any;
  public listTaxesAdded: any;
  public listTaxes: any;
  public actionForm: Action;
  public showFolio: boolean;
  public pageRedirect: any;
  public listBanks: any;
  public listAccountPayableStatus: any;
  public submitted: boolean;

  constructor(
    private toastr: ToastrService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private router: Router,
    public purchaseOrderHeaderService: PurchaseOrderHeaderService,
    public purchaseOrderDetailService: PurchaseOrderDetailService,
    public purchaseOrderDetailTaxService: PurchaseOrderDetailTaxService,
    public taxService: TaxService,
    private bankService: BankService,
    private accountPayableService: AccountPayableService
  ) {
    this.dataHeader = {};
    this.dataDetail = [];
    this.headers = [];
    this.observations = '';
    this.authorizationStatusAuthorized = AuthorizationStatus.Authorized;
    this.authorizationStatusReject = AuthorizationStatus.Rejected;
    this.authorizationStatusId = AuthorizationStatus.None;
    this.dataReceived = {};
    this.accountPayable = {};
    this.total = 0;
    this.subTotal = 0;
    this.quantity = 0;
    this.listAccountPayableDetail = [];
    this.listTaxesDetail = [];
    this.listTaxesAdded = [];
    this.listTaxes = [];
    this.pageRedirect = '/dashboard/finance/account-payable';
    this.listBanks = [];
    this.listAccountPayableStatus = [];
    this.submitted = false;
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
    this.accountPayable = this.config.data;
    this.getAccountPayableById(this.accountPayable.id);
    //this.getAccountPayableDetail(this.accountPayable.id);
    this.getTaxes();
    this.getBanks();
    this.getAccountPayableStatus();
    // this.route.params.subscribe((params) => {
    //   if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
    //     switch (this.route.snapshot.url[0].path) {
    //       case 'addAccountPayable':
    //         this.accountPayable = {
    //           id: 0,
    //           name: '',
    //           description: '',
    //           notes: '',
    //           observations: ''
    //         };
    //         this.accountPayable.period = [
    //           (moment().toDate()),
    //           (moment().add(7, 'days').toDate())
    //         ];
    //         this.accountPayable.estimatedDate = (moment().add(7, 'days').toDate());
    //         this.getTaxes();
    //         this.actionForm = Action.Create;
    //         break;
    //       case 'editAccountPayable':
    //         console.log(params);
    //         this.actionForm = Action.Edit;
    //         this.showFolio = true;
    //         this.getAccountPayableById(params.id);
    //         break;
    //       default:
    //         this.router.navigate([this.pageRedirect]);
    //         break;
    //     }
    //     this.getBanks();
    //     this.getAccountPayableStatus();
    //   } else {
    //     this.router.navigate([this.pageRedirect]);
    //   }
    // });
  }

  getAccountPayableById(accountPayableId): void {
    this.purchaseOrderHeaderService.getPurchaseOrderById(accountPayableId).subscribe(
      data => {
        //this.accountPayable = data;
        // this.accountPayable.supplierContactName = this.accountPayable.supplierContactName !== null ? this.accountPayable.supplierContactName : '';
        // this.accountPayable.supplierPhone = this.accountPayable.supplierPhone !== null ? this.accountPayable.supplierPhone : '';
        // this.accountPayable.notes = this.accountPayable.notes !== null ? this.accountPayable.notes : '';
        // this.accountPayable.observations = this.accountPayable.observations !== null ? this.accountPayable.observations : '';
        this.accountPayable.paymentTermName = data.paymentTermName;
        this.accountPayable.estimatedDate =
          data.estimatedDate !== null ? moment(`${data.estimatedDate}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.accountPayable.startPeriod =
          data.startPeriod !== null ? moment(`${data.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.accountPayable.endPeriod =
          data.endPeriod !== null ? moment(`${data.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
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

  getBanks() {
    this.bankService.getBanks().subscribe(
      data => {
        this.listBanks = data;
        //this.bankObj.value = this.action === Action.Edit ? this.purchaseOrdersReceivedEdition.bankId : null;
      });
  }

  getAccountPayableStatus() {
    this.accountPayableService.getAccountPayableStatus().subscribe(
      data => {
        this.listAccountPayableStatus = data;
        // this.statusObj.value = this.action === Action.Edit ? this.purchaseOrdersReceivedEdition.accountPayableStatusId : null;
      });
  }

  saveForm() {
    this.submitted = true;

    if (this.accountPayable.id === undefined || this.accountPayable.accountPayableStatusId === undefined
      || this.accountPayable.bankId === undefined || this.accountPayable.paymentReference === undefined) {
      this.toastr.warning('Faltan campos por llenar.');
      return;
    }

    const accountPayableSave: any = {};
    accountPayableSave.id = this.accountPayable.id;
    accountPayableSave.accountPayableStatusId = this.accountPayable.accountPayableStatusId;
    accountPayableSave.bankId = this.accountPayable.bankId;
    accountPayableSave.paymentReference = this.accountPayable.paymentReference;
    accountPayableSave.createBy = this.currentUser.userName;

    this.accountPayableService.updateAccountPayable(accountPayableSave).subscribe(data => {
      this.toastr.success('Cuenta por Pagar editada correctamente.');
      this.ref.close(data);
      // this.router.navigate([this.pageRedirect]);
    });
  }


}
