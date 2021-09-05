import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

import { TableListComponent } from '@app/shared/components/table-list/table-list.component';
import { UserSystemService, ProfileSystemService } from '../../../service/';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { UsersFormComponent } from '../users-form/users-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class UsersListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public ref: DynamicDialogRef;
  public headers: any;
  public listData: any;
  public loadingTable: boolean;
  public currentUser: any;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userSystemService: UserSystemService,
    private toastr: ToastrService
  ) {
    this.headers = [];
    this.listData = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'fullName', header: 'Nombre', width: 'col-w xl' },
      { field: 'email', header: 'Correo', width: 'col-w xxl' },
      { field: 'userName', header: 'Usuario', width: 'col-w xxl' },
      { field: 'profileName', header: 'Perfil', width: 'col-w lg' }
    ];

    this.getData();
  }

  getData(): void {
    this.userSystemService.getUsersSystem().subscribe(
      data => {
        this.listData = data;
      });
  }

  refreshData(): void {
    this.getData();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Catálogo de Usuarios`, true, headersExcel);
  }

  deleteItem(value): void {
    this.confirmationService.confirm({
        message: 'Esta Seguro de Borrar este Usuario?',
        header: 'Borrar Usuario',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-danger',
        rejectVisible: false,
        accept: () => {
          this.userSystemService.deleteUserSystem(value.id, this.currentUser.userName).subscribe(
            data => {
              this.toastr.success(`El  Ussuario ${value.name} se a borrado correctamente`);
              this.getData();
            },
            error => {
              this.toastr.error(`Algo Salio mal en el servicio`);
            });
        }
    });
  }

  editItem(event): void {
    event.header = 'Editar Usuario';
    event.type = 2;
    this.openModal(event);
  }

  newItem(): void {
    const data = {
      header: 'Nuevo Usuario',
      type: 1
    };
    this.openModal(data);
  }

  openModal(value): void {
    this.ref = this.dialogService.open(UsersFormComponent, {
      data: value,
      header: value.header,
      width: '70%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (value.type === 1) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario guardado correctamente.'
        });
      } else if (value.type === 2) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario editado correctamente.'
        });
      }
    });
  }

}
