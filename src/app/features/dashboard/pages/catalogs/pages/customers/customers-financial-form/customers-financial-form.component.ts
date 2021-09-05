import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { Action } from '@app/shared/enums';
import { BankService, CurrencyService } from '../../../services';

@Component({
  selector: 'app-customers-financial-form',
  templateUrl: './customers-financial-form.component.html',
  styleUrls: ['./customers-financial-form.component.scss']
})
export class CustomersFinancialFormComponent implements OnInit {

  @ViewChild('formCustomerFinancial', { static: false })
  public formCustomerFinancial: NgForm;

  public action: Action;
  public item: any;
  public dataReceived: any;
  public customerFinancial: any;
  public listCurrencies: any;
  public listBanks: any;
  public submitted: boolean;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private currencyService: CurrencyService,
    private bankService: BankService,
    private toastr: ToastrService
  ) {
    this.dataReceived = {};
    this.customerFinancial = {};
    this.listCurrencies = [];
    this.listBanks = [];
    this.submitted = false;
  }

  ngOnInit(): void {
    this.showForm();
  }

  showForm() {
    this.dataReceived = this.config.data;
    this.action = this.dataReceived.action;
    this.item = this.dataReceived.item;

    switch (this.action) {
      case Action.Create:
        this.customerFinancial = {
          id: 0,
          account: null,
          clabe: null,
          bankId: null,
          bankName: '',
          currencyId: null,
          currencyName: '',
          swift: '',
          contactName: '',
          email: '',
          phone: null
        };
        break;
      case Action.Edit:
        this.customerFinancial = {
          id: this.item.id,
          account: this.item.account,
          clabe: this.item.clabe,
          bankId: this.item.bankId,
          bankName: this.item.bankName,
          currencyId: this.item.currencyId,
          currencyName: this.item.currencyName,
          swift: this.item.swift,
          contactName: this.item.contactName,
          email: this.item.email,
          phone: this.item.phone
        };
        break;
    }

    this.getCurrencies();
    this.getBanks();
  }

  getCurrencies() {
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
      });
  }

  changeCurrency(event) {
    const currencyId = event.value;
    if (currencyId !== null) {
      const currencyText = this.listCurrencies.filter(o => o.id === currencyId)[0].name;
      this.customerFinancial.currencyName = currencyText;
    }
  }

  getBanks() {
    this.bankService.getBanks().subscribe(
      data => {
        this.listBanks = data;
      });
  }

  changeBank(event) {
    const bankId = event.value;
    if (bankId !== null) {
      const bankText = this.listBanks.filter(o => o.id === bankId)[0].name;
      this.customerFinancial.bankName = bankText;
    }
  }

  saveForm() {
    this.submitted = true;

    if (this.formCustomerFinancial.invalid) {
      return;
    }

    this.customerFinancial.contactName = this.customerFinancial.contactName !== null
      ? this.customerFinancial.contactName.trim() : '';

    this.closeForm(this.customerFinancial);
  }

  closeForm(resp): void {
    this.ref.close(resp);
  }

}
