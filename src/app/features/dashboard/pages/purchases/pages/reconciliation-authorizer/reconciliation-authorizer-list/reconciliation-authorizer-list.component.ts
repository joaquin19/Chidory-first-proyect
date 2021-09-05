import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { ProcessType, AuthorizationStatus, FormatColumn } from '@app/shared/enums';
import { AuthorizationsComponent } from '@app/shared/components/authorizations/authorizations.component';
import { ReconciliationAuthorizerDetailFormComponent } from '../reconciliation-authorizer-detail-form/reconciliation-authorizer-detail-form.component';
import { ReconciliationAuthorizerFormComponent } from '../reconciliation-authorizer-form/reconciliation-authorizer-form.component';

@Component({
  selector: 'app-reconciliation-authorizer-list',
  templateUrl: './reconciliation-authorizer-list.component.html',
  styleUrls: ['./reconciliation-authorizer-list.component.scss']
})
export class ReconciliationAuthorizerListComponent implements OnInit {

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
    this.processType = ProcessType.Reconciliation;
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
    this.ref = this.dialogService.open(ReconciliationAuthorizerDetailFormComponent, {
      data: item,
      header: ``,
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
          this.toastr.success(`Conciliación Autorizada correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Conciliación Rechazada correctamente.`);
          this.refreshData();
      }
    });
  }

  processSelected(items) {
    if (items.length <= 0) {
      this.toastr.warning(`Favor de seleccionar al menos una conciliación.`);
      return;
    }

    this.ref = this.dialogService.open(ReconciliationAuthorizerFormComponent, {
      data: items,
      header: `Procesar Conciliaciones`,
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
          this.toastr.success(`Conciliaciones Autorizadas correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Conciliaciones Rechazadas correctamente.`);
          this.refreshData();
          break;
      }
    });
  }

  refreshData(): void {
    this.authorizationsRequisitions.refreshData();
  }

}
