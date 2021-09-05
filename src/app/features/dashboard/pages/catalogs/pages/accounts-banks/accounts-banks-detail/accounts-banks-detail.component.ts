import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GenericDataService } from '../../../../sales/services/generic-data.service';

@Component({
  selector: 'app-accounts-banks-detail',
  templateUrl: './accounts-banks-detail.component.html',
  styleUrls: ['./accounts-banks-detail.component.scss']
})
export class AccountsBanksDetailComponent implements OnInit {

  public accountBankDetail: any;
  public currentUser: any;
  public listAccountBank: any;
  public accountBankContact: any;

  constructor(
    public ref: DynamicDialogRef,
    private genericDataService: GenericDataService,
    public config: DynamicDialogConfig,
  ) {
    this.listAccountBank = [];
    this.accountBankDetail = {
      id: 0,
      name: '',
      description: '',
      bankId: null,
      branchOffice: null,
      currencyId: null,
      accountNumber: null,
      clabe: null,
      swiftCode: '',
      balance: null,
      checkNumber: null
    };
    this.accountBankContact = {
      id: 0,
      accountBankId: null,
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      phone1: '',
      phone2: '',
      movil1: '',
      movil2: ''
    };
   }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.accountBankDetail = {
      accountNumber: this.config.data.accountNumber,
      balance: this.config.data.balance,
      bankId: this.config.data.bankId,
      bankName: this.config.data.bankName,
      branchOffice: this.config.data.branchOffice,
      charge: this.config.data.charge,
      checkNumber: this.config.data.checkNumber,
      clabe: this.config.data.clabe,
      code: this.config.data.code,
      credit: this.config.data.credit,
      currencyId: this.config.data.currencyId,
      currencyName: this.config.data.currencyName,
      description: this.config.data.description,
      id: this.config.data.id,
      inactive: this.config.data.inactive,
      initialBalance: this.config.data.initialBalance,
      name: this.config.data.name,
      swiftCode: this.config.data.swiftCode,
    };
  }

  close(resp): void {
    this.ref.close(resp);
  }
}
