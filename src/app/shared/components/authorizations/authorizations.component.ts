import { Component, OnDestroy, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { TableListComponent } from '../table-list/table-list.component';
import { AuthorizationProcessService } from '../../services/authorization-process.service';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { AuthorizationStatus, ProcessType } from '@app/shared/enums';


@Component({
  selector: 'app-authorizations',
  templateUrl: './authorizations.component.html',
  styleUrls: ['./authorizations.component.scss']
})
export class AuthorizationsComponent implements OnInit, OnDestroy {

  @Input() typeAuthorization: string;
  @Input() displayAuthorization: string;
  @Input() processTypeId: ProcessType;
  @Input() headers: any;
  @Input() statusId: number;

  @Output() detailAuthorization = new EventEmitter();
  @Output() processSelected = new EventEmitter();

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public dataKey: any
  public ref: DynamicDialogRef;
  public loadingTable: boolean;
  public listAuthorizations: any;
  public currentUser: any;
  public displayModal: boolean;
  public titleConfirm: string;
  public messageConfirm: string;
  public severityConfirm: string;
  public observations: string;
  public itemAuthorize: any;
  public authorizationStatusAuthorized: AuthorizationStatus;
  public authorizationStatusReject: AuthorizationStatus;
  public authorizationStatusId: AuthorizationStatus;
  public requiredObservation: boolean;
  public listSelectedItems: any;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private authorizationProcessService: AuthorizationProcessService,
    private toastr: ToastrService
  ) {
    this.dataKey = 'id';
    this.headers = [];
    this.loadingTable = false;
    this.listAuthorizations = [];
    this.displayModal = false;
    this.titleConfirm = '';
    this.messageConfirm = '';
    this.severityConfirm = '';
    this.observations = '';
    this.itemAuthorize = {};
    this.requiredObservation = false;
    this.listSelectedItems = [];
    this.authorizationStatusAuthorized = AuthorizationStatus.Authorized;
    this.authorizationStatusReject = AuthorizationStatus.Rejected;
    this.authorizationStatusId = AuthorizationStatus.None;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.getAuthorizationProcess();
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  getAuthorizationProcess(): void {
    this.listSelectedItems = [];
    this.authorizationProcessService.getAuthorizations(this.processTypeId, this.currentUser.userName, AuthorizationStatus.Pending, 0)
      .subscribe(
        data => {
          this.listAuthorizations = data;
          this.listAuthorizations.map(o => {
            o.createdOn = moment(o.createdOn, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD');
            o.fullName = o.fullName === null ? 'No Asignado' : o.fullName;
          });
        },
        error => {
          this.toastr.error(error.message);
        });
  }

  refreshData(): void {
    this.tableList.refreshTable();
    this.getAuthorizationProcess();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Autorización de ${this.typeAuthorization}`, true, headersExcel);
  }

  detailItem(event): void {
    this.detailAuthorization.emit(event);
  }

  authorizeItem(event): void {
    this.itemAuthorize = event;
    this.titleConfirm = `Confirmación`
    this.messageConfirm = `¿Desea <strong>autorizar</strong> la ${this.displayAuthorization} <strong>${event.folio}</strong>?`;
    this.severityConfirm = 'success';
    this.authorizationStatusId = AuthorizationStatus.Authorized;
    this.requiredObservation = false;
    this.displayModal = true;
  }

  rejectItem(event): void {
    this.itemAuthorize = event;
    this.titleConfirm = `Confirmación`
    this.messageConfirm = `¿Desea <strong>rechazar</strong> la ${this.displayAuthorization} <strong>${event.folio}</strong>?`;
    this.severityConfirm = 'error';
    this.authorizationStatusId = AuthorizationStatus.Rejected;
    this.requiredObservation = true;
    this.displayModal = true;
  }

  closeModal(): void {
    this.titleConfirm = '';
    this.messageConfirm = '';
    this.observations = '';
    this.itemAuthorize = {};
    this.displayModal = false;
  }

  processAuthorizations(authorizationStatusId): void {
    this.authorizationStatusId = authorizationStatusId;

    if (this.observations.trim() === '' && this.authorizationStatusId === AuthorizationStatus.Rejected) {
      return;
    }

    const authorizationsSave: any = {};

    authorizationsSave.processTypeId = this.processTypeId;
    authorizationsSave.authorizationStatusId = this.authorizationStatusId;
    authorizationsSave.createBy = this.currentUser.userName;
    authorizationsSave.observation = this.observations;

    const detailArray = [];
    detailArray.push({
      id: this.itemAuthorize.id,
      valueId: this.itemAuthorize.valueId
    });

    authorizationsSave.detail = detailArray;

    this.authorizationProcessService.updateAuthorizationProcess(authorizationsSave).subscribe(
      data => {
        switch (this.authorizationStatusId) {
          case AuthorizationStatus.Authorized:
            this.toastr.success(`${this.displayAuthorization} Autorizada correctamente.`);
            break;
          case AuthorizationStatus.Rejected:
            this.toastr.success(`${this.displayAuthorization} Rechazada correctamente.`);
        }
        this.closeModal();
        this.getAuthorizationProcess();
      });
  }

  selectedItems(event): void {
    this.listSelectedItems = event;
  };

  handleProcessSelected(): void {
    this.processSelected.emit(this.listSelectedItems);
  }

}
