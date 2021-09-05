import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { Action } from '@app/shared/enums';
import { BankService, CurrencyService } from '../../../services';

@Component({
  selector: 'app-suppliers-financial-form',
  templateUrl: './suppliers-financial-form.component.html',
  styleUrls: ['./suppliers-financial-form.component.scss']
})
export class SuppliersFinancialFormComponent implements OnInit {

  @ViewChild('formSupplierFinancial', { static: false })
  public formSupplierFinancial: NgForm;

  public action: Action;
  public item: any;
  public dataReceived: any;
  public supplierFinancial: any;
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
    this.supplierFinancial = {};
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
        this.supplierFinancial = {
          id: 0,
          account: null,
          clabe: null,
          bankId: null,
          bankName: '',
          currencyId: null,
          currencyName: '',
        };
        break;
      case Action.Edit:
        this.supplierFinancial = {
          id: this.item.id,
          account: this.item.account,
          clabe: this.item.clabe,
          bankId: this.item.bankId,
          bankName: this.item.bankName,
          currencyId: this.item.currencyId,
          currencyName: this.item.currencyName
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
      this.supplierFinancial.currencyName = currencyText;
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
      this.supplierFinancial.bankName = bankText;
    }
  }

  saveForm() {
    this.submitted = true;

    if (this.formSupplierFinancial.invalid) {
      return;
    }

    this.closeForm(this.supplierFinancial);
  }

  closeForm(resp): void {
    this.ref.close(resp);
  }

}
