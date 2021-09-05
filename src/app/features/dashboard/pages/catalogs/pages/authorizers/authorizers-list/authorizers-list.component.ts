import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableListComponent } from '../../../../../../../shared/components/table-list/table-list.component';
import { AuthorizersFormComponent } from '../authorizers-form/authorizers-form.component';
import { AuthorizersOrderFormComponent } from '../authorizers-order-form/authorizers-order-form.component';
import { AuthorizerService } from '../../../services/authorizer.service';
import { Action, FormatColumn } from '@app/shared/enums';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authorizers-list',
  templateUrl: './authorizers-list.component.html',
  styleUrls: ['./authorizers-list.component.scss']
})
export class AuthorizersListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public ref: DynamicDialogRef;
  public headers: any;
  public listAuthorizer: any;
  public loadingTable: boolean;
  public currentUser: any;

  constructor(
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public authorizerService: AuthorizerService
  ) {
    this.headers = [];
    this.listAuthorizer = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'userName', header: 'Usuario', width: 'col-w xl' },
      { field: 'fullName', header: 'Nombre', width: 'col-w xl' },
      { field: 'processTypeName', header: 'Tipo Proceso', width: 'col-w lg' },
      { field: 'sortOrder', header: 'Orden', width: 'col-w sm' },
      { field: 'required', header: 'Requerido', width: 'col-w sm', format: FormatColumn.Check }
    ];

    this.getAuthorizers();
  }

  getAuthorizers(): void {
    this.authorizerService.getAuthorizers().subscribe(
      data => {
        this.listAuthorizer = data;
      });
  }

  refreshData(): void {
    this.getAuthorizers();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Catálogo de Autorizadores`, true, headersExcel);
  }

  editItem(event): void {
    const data = {
      authorizer: { ...event },
      header: 'Editar Autorizador',
      action: Action.Edit
    };
    this.openModal(data);
  }

  newItem(): void {
    const data = {
      authorizer: {},
      header: 'Nuevo Autorizador',
      action: Action.Create
    };
    this.openModal(data);
  }

  openModal(data): void {
    this.ref = this.dialogService.open(AuthorizersFormComponent, {
      data,
      header: data.header,
      width: '65%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.refreshData();
      }
    });
  }

  orderItem(event): void {
    const data = { ...event };
    this.ref = this.dialogService.open(AuthorizersOrderFormComponent, {
      data,
      header: `Editar Orden Autorizadores`,
      width: '65%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.refreshData();
      }
    });
  }

  deleteItem(event): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar el autorizador <strong>${event.fullName}</strong> del proceso <strong>${event.processTypeName}</strong>?`,
      header: 'Borrar Autorizador',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      accept: () => {

        this.deleteAuthorizer(event.id);
      }
    });
  }

  deleteAuthorizer(authorizerId): void {
    this.authorizerService.deleteAuthorizer(authorizerId, this.currentUser.userName).subscribe(
      data => {
        this.toastr.success('Autorizador eliminado correctamente.');
        this.refreshData();
      });
  }

}
