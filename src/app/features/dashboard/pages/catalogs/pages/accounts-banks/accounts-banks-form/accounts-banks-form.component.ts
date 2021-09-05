import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountBanksService } from '../../../services';
import { GenericDataService } from '../../../../sales/services/generic-data.service';
import { Action } from '../../../../../../../shared/enums/action';

@Component({
  selector: 'app-accounts-banks-form',
  templateUrl: './accounts-banks-form.component.html',
  styleUrls: ['./accounts-banks-form.component.scss']
})
export class AccountsBanksFormComponent implements OnInit {

  public accountBank: any;
  public accountBankContact: any;
  public currentUser: any;
  public action: Action;
  public listData: any;
  public listBanks: any;
  public listCurrencies: any;
  public listAccountBankContact: any;
  public submitted: boolean;

  constructor(
    public ref: DynamicDialogRef,
    private genericDataService: GenericDataService,
    public config: DynamicDialogConfig,
    private toastr: ToastrService,
    private accountsBanksService: AccountBanksService
  ) {
    this.submitted = false;
    this.listData = [];
    this.accountBank = [];
    this.listCurrencies = [];
    this.listAccountBankContact = [];
    this.listBanks = [];
    this.accountBankContact = [];
    this.accountBank = {
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
    this.action = this.config.data.type;
   }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.showForm();
  }

  showForm(): void {
    switch (this.action) {
      case Action.Create:
        this.accountBank = {
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
        break;
      case Action.Edit:
        this.accountBank = {
          id: this.config.data.id,
          name: this.config.data.name,
          description: this.config.data.description,
          bankId: this.config.data.bankId,
          branchOffice: this.config.data.branchOffice,
          currencyId: this.config.data.currencyId,
          accountNumber: this.config.data.accountNumber,
          clabe: this.config.data.clabe,
          swiftCode: this.config.data.swiftCode,
          balance: this.config.data.balance,
          initialBalance: this.config.data.initialBalance,
          checkNumber: this.config.data.checkNumber,
          inactive: this.config.data.inactive
        };
        this.getAccountBankcontacts();
        break;
    }

    this.getBanks();
    this.getCurrencies();
  }

  getAccountBankcontacts(): void {
    this.accountsBanksService.getAccountBankContactsByAccountBankId(this.accountBank.id).subscribe(
      data => {
        this.listAccountBankContact = data;
        if (this.listAccountBankContact.length > 0) {
          this.accountBankContact = this.listAccountBankContact[0];
          console.log(this.accountBankContact);

        }
      });
  }

  getBanks(): void {
    this.genericDataService.getBanks().subscribe(
      data => {
        this.listBanks = data;
        this.accountBank.bankId = this.action === Action.Edit ? this.accountBank.bankId : 0;
      });
  }

  getCurrencies(): void {
    this.genericDataService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        this.accountBank.currencyId = this.action === Action.Edit ? this.accountBank.currencyId : 0;
      });
  }

  close(resp): void {
    this.ref.close(resp);
  }

  getAccountsBanks(): void {
    this.accountsBanksService.getAccountBanks().subscribe(
      data => {
        this.listData = data;
      });
  }

  saveForm(): void {
    this.submitted = true;

    const accountBankSave: any = {};

    accountBankSave.id = this.accountBank.id;
    accountBankSave.name = this.accountBank.name.trim();
    accountBankSave.description = this.accountBank.description.trim();
    accountBankSave.bankId = this.accountBank.bankId;
    accountBankSave.currencyId = this.accountBank.currencyId;
    accountBankSave.branchOffice = this.accountBank.branchOffice;
    accountBankSave.accountNumber = this.accountBank.accountNumber;
    accountBankSave.clabe = this.accountBank.clabe;
    accountBankSave.swiftCode = this.accountBank.swiftCode;
    accountBankSave.initialBalance = this.accountBank.initialBalance;
    accountBankSave.checkNumber = this.accountBank.checkNumber;
    accountBankSave.createBy = this.currentUser.userName;
    accountBankSave.accountBankContact = [];

    accountBankSave.accountBankContact.push(this.accountBankContact);

    switch (this.action) {
      case Action.Create:
        this.accountsBanksService.saveAccountBank(accountBankSave).subscribe(data => {
          this.getAccountsBanks();
          this.ref.close(false);
          this.toastr.success(`La Cuenta Bancaria ${this.accountBank.name.trim()} se guardo Correctamente`);
        }, error => {
          this.toastr.error(`La Cuenta Bancaria ${this.accountBank.name.trim()} no se guardo`);
        });
        break;
      case Action.Edit:
        this.accountsBanksService.updateAccountBank(accountBankSave).subscribe(data => {
          this.getAccountsBanks();
          this.toastr.success(`La Cuenta Bancaria ${this.accountBank.name.trim()} se edito correctamente`);
          this.ref.close(false);
        }, error => {
          this.toastr.error(`Ocurrio un error en el servicio al Editar la Cuenta  ${this.accountBank.name.trim()} `);
        });
        break;
    }
  }

}
