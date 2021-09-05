import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';

@Component({
  selector: 'app-reconciliation-authorizer-form',
  templateUrl: './reconciliation-authorizer-form.component.html',
  styleUrls: ['./reconciliation-authorizer-form.component.scss']
})
export class ReconciliationAuthorizerFormComponent implements OnInit {

  public dataHeader: any;
  public dataDetail: any;
  public headersDetail: any;
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
    private toastr: ToastrService
  ) {
    this.dataHeader = {};
    this.dataDetail = [];
    this.headersDetail = [];
    this.observations = '';
    this.authorizationStatusAuthorized = AuthorizationStatus.Authorized;
    this.authorizationStatusReject = AuthorizationStatus.Rejected;
    this.authorizationStatusId = AuthorizationStatus.None;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headersDetail = [
      { field: 'folio', header: 'Folio', width: 'col-w lg' },
      { field: 'subTotal', header: 'SubTotal', width: 'col-w lg', format: FormatColumn.Currency },
      { field: 'total', header: 'Total', width: 'col-w lg', format: FormatColumn.Currency },
      { field: 'fullName', header: 'Creado Por', width: 'col-w xxl' },
      { field: 'createdOn', header: 'Fecha Creación', width: 'col-w xxl', format: FormatColumn.Date }
    ];

    this.showForm();
  }

  showForm() {
    this.dataDetail = this.config.data;
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

    authorizationsSave.processTypeId = ProcessType.Requisition;
    authorizationsSave.authorizationStatusId = this.authorizationStatusId;
    authorizationsSave.createBy = this.currentUser.userName;
    authorizationsSave.observation = this.observations;

    const detailArray = [];

    this.dataDetail.forEach(item => {
      detailArray.push({
        id: item.id,
        valueId: item.valueId
      });
    });

    authorizationsSave.detail = detailArray;

    this.authorizationProcessService.updateAuthorizationProcess(authorizationsSave).subscribe(
      data => {
        this.closeForm(this.authorizationStatusId);
      });
  }

}
