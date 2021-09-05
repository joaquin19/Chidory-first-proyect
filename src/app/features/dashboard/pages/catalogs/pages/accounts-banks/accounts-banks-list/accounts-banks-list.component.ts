import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableListComponent } from '../../../../../../../shared/components/table-list/table-list.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AccountsBanksDetailComponent } from '../accounts-banks-detail/accounts-banks-detail.component';
import { AccountsBanksFormComponent } from '../accounts-banks-form/accounts-banks-form.component';
import { AccountBanksService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import { UserAuthenticationModel } from '@app/core/models/auth.model';

@Component({
  selector: 'app-accounts-banks-list',
  templateUrl: './accounts-banks-list.component.html',
  styleUrls: ['./accounts-banks-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class AccountsBanksListComponent implements OnInit, OnDestroy {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public headers: any;
  public listData: any;
  public loadingTable: boolean;
  public ref: DynamicDialogRef;
  public currentUser: any;

  constructor(
    private confirmationService: ConfirmationService,
    private accountBankService: AccountBanksService,
    public dialogService: DialogService,
    private toastr: ToastrService,
    public messageService: MessageService
  ) {
    this.headers = [];
    this.listData = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { width: 'col-w  md', field: 'name', header: 'Nombre'},
      { width: 'col-w  lg', field: 'description', header: 'Descripción'},
      { width: 'col-w  md', field: 'bankName', header: 'Banco'},
      { width: 'col-w  lg', field: 'branchOffice', header: 'Sucursal'},
      { width: 'col-w  md', field: 'currencyName', header: 'Moneda'},
      { width: 'col-w  md', field: 'balance', header: 'Saldo'},
      { width: 'col-w  lg', field: 'accountNumber', header: 'Número de Cuenta'},
      { width: 'col-w  md', field: 'clabe', header: 'Clabe'},
    ];
    this.getAccountsBanks();
  }
  getAccountsBanks(): void {
    this.accountBankService.getAccountBanks().subscribe(
      data => {
        this.listData = data;
        this.loadingTable = false;
      },
      error => {
      });
  }

  ngOnDestroy(): void {
    if (this.ref) {
        this.ref.close();
    }
  }

  deleteItem(value): void {
    this.confirmationService.confirm({
        message: 'Esta Seguro de Borrar esta Cuenta?',
        header: 'Borrar Cuenta Bancaria',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-danger',
        rejectVisible: false,
        accept: () => {
          this.accountBankService.updateAccountBankInactive(value.id, this.currentUser.userName).subscribe(
            data => {
              this.toastr.success(`La Cuenta Bancarea se ha borrado correctamente`);
              this.getAccountsBanks();
            },
            error => {
              this.toastr.error(`Algo Salio mal en el servicio`);
            });
        }
    });
  }

  detailItem(event): void {
    this.ref = this.dialogService.open(AccountsBanksDetailComponent, {
      data: event,
      header: 'Detalle de cuenta bancaria',
      width: '95%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
    });
    console.log(event);

  }

  editItem(event): void {
    event.header = 'Editar Cuenta Bancaria';
    event.type = 2;
    this.openModal(event);
  }

  newItem(): void {
    const data = {
      header: 'Nueva Cuenta Bancaria',
      type: 1
    };
    this.openModal(data);
  }

  openModal(value): void {
    this.ref = this.dialogService.open(AccountsBanksFormComponent, {
      data: value,
      header: value.header,
      width: '95%',
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
          detail: 'Artículo guardado correctamente.'
        });
      } else if (value.type === 2) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Artículo editado correctamente.'
        });
      }
    });
  }

  refreshData(): void {
    this.getAccountsBanks();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Catálogo de Cuentas Bancarias`, true, headersExcel);
  }

}
