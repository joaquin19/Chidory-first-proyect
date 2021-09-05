import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';
import { PriceHeaderService, PriceDetailService } from '../../../services';

@Component({
  selector: 'app-price-list-authorizer-detail-form',
  templateUrl: './price-list-authorizer-detail-form.component.html',
  styleUrls: ['./price-list-authorizer-detail-form.component.scss']
})
export class PriceListAuthorizerDetailFormComponent implements OnInit {

  public dataReceived: any;
  public priceList: any;
  public priceListDetail: any;
  public headers: any;
  public observations: string;
  public requiredObservation: boolean;
  public authorizationStatusAuthorized: AuthorizationStatus;
  public authorizationStatusReject: AuthorizationStatus;
  public authorizationStatusId: AuthorizationStatus;
  public currentUser: any;


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authorizationProcessService: AuthorizationProcessService,
    private priceHeaderService: PriceHeaderService,
    private priceDetailService: PriceDetailService,
    private toastr: ToastrService
  ) {
    this.dataReceived = {};
    this.priceList = {};
    this.priceListDetail = [];
    this.headers = [];
    this.observations = '';
    this.authorizationStatusAuthorized = AuthorizationStatus.Authorized;
    this.authorizationStatusReject = AuthorizationStatus.Rejected;
    this.authorizationStatusId = AuthorizationStatus.None;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headers = [
      { field: 'no', header: 'NO', width: 'col-w sm' },
      { field: 'saleType', header: 'TIPO', width: 'col-w md' },
      { field: 'carModel', header: 'MODELO', width: 'col-w md' },
      { field: 'carModelDr', header: 'MODELO DR', width: 'col-w md' },
      { field: 'partNumber', header: 'NÚMERO DE PARTE', width: 'col-w lg' },
      { field: 'partNumberCustomer', header: 'NO DE PARTE CLIENTE', width: 'col-w lg' },
      { field: 'component', header: 'COMPONENTE', width: 'col-w md' },
      { field: 'partName', header: 'NOMBRE DE PARTE', width: 'col-w xl' },
      { field: 'material', header: 'MATERIAL', width: 'col-w md' },
      { field: 'unit', header: 'UNIDAD', width: 'col-w md' },
      { field: 'uS', header: 'U/S', width: 'col-w md' },
      { field: 'option', header: 'OPCIÓN', width: 'col-w md' },
      { field: 'taxName', header: 'IMPUESTO', width: 'col-w md' },
      { field: 'salePrice', header: 'PRECIO VENTA', width: 'col-w md', format: FormatColumn.Currency }
    ];

    this.showForm();
  }

  showForm() {
    this.dataReceived = this.config.data;
    this.getPriceById(this.dataReceived.valueId);
  }

  getPriceById(priceById) {
    this.priceHeaderService.getPriceById(priceById).subscribe(
      data => {
        this.priceList = data;
        this.priceList.startDate = moment(this.priceList.startDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.priceList.endDate = moment(this.priceList.endDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.getPriceDetailByHeaderId(priceById);
      });
  }

  getPriceDetailByHeaderId(priceHeaderId) {
    this.priceDetailService.getPriceDetailByHeaderId(priceHeaderId).subscribe(
      data => {
        this.priceListDetail = data;
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

    authorizationsSave.processTypeId = ProcessType.Prices;
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

}
