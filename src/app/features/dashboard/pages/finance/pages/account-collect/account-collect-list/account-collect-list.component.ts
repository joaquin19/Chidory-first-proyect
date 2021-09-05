import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorizationsComponent } from '@app/shared/components/authorizations/authorizations.component';
import { AuthorizationStatus, ProcessType } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountCollectDetailComponent } from '../account-collect-detail/account-collect-detail.component';
import { AccountCollectFormComponent } from '../account-collect-form/account-collect-form.component';
import { FormatColumn } from '../../../../../../../shared/enums/format-column';

@Component({
  selector: 'app-account-collect-list',
  templateUrl: './account-collect-list.component.html',
  styleUrls: ['./account-collect-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class AccountCollectListComponent implements OnInit {

  @ViewChild('authorizationsRequisitions', { static: false })
  public authorizationsRequisitions: AuthorizationsComponent;

  public ref: DynamicDialogRef;
  public headers: any;
  public processType: ProcessType;

  constructor(
    public dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.headers = [];
    this.processType = ProcessType.AccountCollect;
  }

  ngOnInit(): void {
    this.headers = [
      { field: 'folio', header: 'Folio', width: 'col-w md' },
      { field: 'processTypeName', header: 'Tipo Proceso', width: 'col-w lg' },
      { field: 'subTotal', header: 'Sub Total', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'taxes', header: 'Impuestos', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'total', header: 'Total', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'fullName', header: 'Autorizador', width: 'col-w lg' },
      { field: 'createBy', header: 'Creado Por', width: 'col-w lg' },
      { field: 'createdOn', header: 'Fecha Creación', width: 'col-w lg', format: FormatColumn.Date }
    ];
  }

  detailAuthorization(item): void {
    this.ref = this.dialogService.open(AccountCollectDetailComponent, {
      data: item,
      header: `Detalle de Cuenta por Cobrar - Folio: ${item.folio}`,
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
          this.toastr.success(`Cuenta por Cobrar Autorizada correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Cuenta por Cobrar Rechazada correctamente.`);
          this.refreshData();
      }
    });
  }

  processSelected(items): void {
    if (items.length <= 0) {
      this.toastr.warning(`Favor de seleccionar al menos una Cuenta por Cobrar.`);
      return;
    }

    this.ref = this.dialogService.open(AccountCollectFormComponent, {
      data: items,
      header: `Procesar Cuentas por Cobrar`,
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
          this.toastr.success(`Cuentas por Cobrar Autorizadas correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Cuentas por Cobrar Rechazadas correctamente.`);
          this.refreshData();
          break;
      }
    });
  }

  refreshData(): void {
    this.authorizationsRequisitions.refreshData();
  }

}
