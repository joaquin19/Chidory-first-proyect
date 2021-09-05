import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GenericDataService } from '../../../../sales/services/generic-data.service';
import { ExchangeRateService } from '../../../services/exchange-rate.service';

@Component({
  selector: 'app-exchange-rate-form',
  templateUrl: './exchange-rate-form.component.html',
  styleUrls: ['./exchange-rate-form.component.scss']
})
export class ExchangeRateFormComponent implements OnInit {

  public exchangeRate: any;
  public listCurrencies: any;
  public action: number;
  public currentUser: any;
  public listData: any;
  public submitted: boolean;

  constructor(
    public ref: DynamicDialogRef,
    private exchangeRateService: ExchangeRateService,
    private genericDataService: GenericDataService,
    public config: DynamicDialogConfig,
    private toastr: ToastrService
  ) {
    this.submitted = false;
    this.exchangeRate = {};
    this.listData = [];
    this.listCurrencies = [];
    this.action = this.config.data.type;
    this.exchangeRate = {
      id: 0,
      currencyId: 0,
      exchangeRateValue: null,
      changeDay: ''
    };
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.exchangeRate = this.config.data;
    this.showForm();
  }

  closeForm(value): void {
    this.ref.close(value);
  }

  showForm(): void {
    switch (this.action) {
      case 1:
        this.exchangeRate = {
          id: 0,
          exchangeRateValue: null,
          changeDay: ''
        };
        break;
      case 2:
        this.exchangeRate = {
          id: this.config.data.id,
          exchangeRateValue: this.config.data.exchangeRateValue,
          changeDay: this.config.data.changeDay
        };
        // if (this.exchangeRate.estimatedDate != null) {
        //   const [day, month, year] = this.exchangeRate.estimatedDate.split('-');
        //   const objDate = {
        //     day: parseInt(day, 0),
        //     month: parseInt(month, 0),
        //     year: parseInt(year, 0)
        //   };
        //   this.exchangeRate = objDate;
        // }
        break;
    }

    this.getCurrencies();
  }

  getCurrencies(): void {
    this.genericDataService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        this.exchangeRate.currencyId = this.config.data.type === 2 ? this.config.data.currencyId : 0;
      },
      error => {
    });
  }

  getData(): void {
    this.exchangeRateService.getExchangeRates().subscribe(
      data => {
        this.listData = data;
      });
  }

  saveForm(): void {
    this.submitted = true;
    const exchangeRateSave: any = {};

    exchangeRateSave.id = this.exchangeRate.id;
    exchangeRateSave.currencyId = this.exchangeRate.currencyId;
    exchangeRateSave.exchangeRateValue = this.exchangeRate.exchangeRateValue;
    exchangeRateSave.changeDay = moment(this.exchangeRate.changeDay).format('YYYY-MM-DD');
    exchangeRateSave.createBy = this.currentUser.userName;
    switch (this.action) {
      case 1:
        this.exchangeRateService.saveExchangeRate(exchangeRateSave).subscribe(data => {
          this.getData();
          this.ref.close(false);
          this.toastr.success(`El Tipo de Cambio ${this.exchangeRate.id} se guardo Correctamente`);
        }, error => {
          this.toastr.error(`El Tipo de Cambio ${this.exchangeRate.id} no se guardo`);
        });
        break;
      case 2:
        this.exchangeRateService.updateExchangeRate(exchangeRateSave).subscribe(data => {
          this.getData();
          this.ref.close(false);
          this.toastr.success(`El Tipo de Cambio ${this.exchangeRate.id} se edito Correctamente`);
        }, error => {
          this.toastr.error(`El Tipo de Cambio ${this.exchangeRate.id} no se edito`);
        });
        break;
    }
  }

}
