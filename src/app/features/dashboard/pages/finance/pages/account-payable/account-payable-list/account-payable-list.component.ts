import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { AuthorizationsComponent } from '@app/shared/components/authorizations/authorizations.component';
import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountPayableService } from '../../../service';
import { AccountPayableDetailComponent } from '../account-payable-detail/account-payable-detail.component';
import { AccountPayableFormComponent } from '../account-payable-form/account-payable-form.component';
import * as moment from 'moment';
import { TableListComponent } from '@app/shared/components/table-list/table-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-payable-list',
  templateUrl: './account-payable-list.component.html',
  styleUrls: ['./account-payable-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class AccountPayableListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  @ViewChild('authorizationsRequisitions', { static: false })
  public authorizationsRequisitions: AuthorizationsComponent;

  public ref: DynamicDialogRef;
  public headers: any;
  public processType: ProcessType;
  public currentUser: any;
  public listAccountPayable: any;
  public loadingTable: boolean;

  constructor(
    public dialogService: DialogService,
    private toastr: ToastrService,
    private accountPayableService: AccountPayableService,
    private router: Router
  ) {
    this.headers = [];
    this.processType = ProcessType.AccountPayable;
    this.currentUser = {};
    this.listAccountPayable = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'folio', header: 'Folio', width: 'col-w md' },
      { field: 'accountPayableStatusName', header: 'Estatus', width: 'col-w lg' },
      { field: 'costCenterName', header: 'Centro de Costos', width: 'col-w md' },
      { field: 'businessUnitName', header: 'Unidad de Negocio', width: 'col-w md' },
      { field: 'subTotal', header: 'Sub Total', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'taxes', header: 'Impuestos', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'total', header: 'Total', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'supplierName', header: 'Proveedor', width: 'col-w lg' },
      { field: 'createBy', header: 'Creado Por', width: 'col-w lg' },
      { field: 'createdOn', header: 'Fecha Creación', width: 'col-w lg', format: FormatColumn.Date }
    ];
    this.getData();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Órdenes de Compra`, true, headersExcel);
  }

  detailAuthorization(item): void {
    this.ref = this.dialogService.open(AccountPayableDetailComponent, {
      data: item,
      header: `Detalle Cuenta por Pagar - Folio: ${item.folio}`,
      width: '95%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      switch (result) {
        case AuthorizationStatus.Authorized:
          this.toastr.success(`Cuenta por Pagar Autorizada correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Cuenta por Pagar Rechazada correctamente.`);
          this.refreshData();
      }
    });
  }

  processSelected(items): void {
    if (items.length <= 0) {
      this.toastr.warning(`Favor de seleccionar al menos una Cuenta por Pagar.`);
      return;
    }

    this.ref = this.dialogService.open(AccountPayableFormComponent, {
      data: items,
      header: `Procesar Cuentas por Pagar`,
      width: '95%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      switch (result) {
        case AuthorizationStatus.Authorized:
          this.toastr.success(`Cuentas por Pagar Autorizadas correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Cuentas por Pagar Rechazadas correctamente.`);
          this.refreshData();
          break;
      }
    });
  }

  getData() {
    this.accountPayableService.getAuthorizedPurchaseOrders(this.currentUser.userName, AuthorizationStatus.Authorized)
      .subscribe(
        data => {
          this.listAccountPayable = data;
          this.listAccountPayable.map(o => o.createdOn = moment(o.createdOn, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD'));
        },
        error => {
          this.toastr.error(error.message);
        });
  }

  refreshData(): void {
    this.getData();
  }

  detailItem(event): void {
    this.openModal(event);
  }

  editItem(event): void {
    this.openModalEdit(event);
    //this.router.navigate([`/dashboard/finance/account-payable/editAccountPayable/${event.id}`]);
  }

  openModal(data): void {
    this.ref = this.dialogService.open(AccountPayableDetailComponent, {
      data,
      header: 'Detalle de Orden de Compra',
      width: '95%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });
  }

  openModalEdit(data): void {
    this.ref = this.dialogService.open(AccountPayableFormComponent, {
      data,
      header: 'Editar Estatus de Cuenta por Pagar',
      width: '95%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });
  }
}
