import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { ProcessType, AuthorizationStatus, FormatColumn } from '@app/shared/enums';
import { AuthorizationsComponent } from '@app/shared/components/authorizations/authorizations.component';
import { RequisitionsAuthorizerDetailFormComponent } from '../requisitions-authorizer-detail-form/requisitions-authorizer-detail-form.component';
import { RequisitionsAuthorizerFormComponent } from '../requisitions-authorizer-form/requisitions-authorizer-form.component';

@Component({
  selector: 'app-requisitions-authorizer-list',
  templateUrl: './requisitions-authorizer-list.component.html',
  styleUrls: ['./requisitions-authorizer-list.component.scss']
})
export class RequisitionsAuthorizerListComponent implements OnInit {

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
    this.processType = ProcessType.Requisition;
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
    this.ref = this.dialogService.open(RequisitionsAuthorizerDetailFormComponent, {
      data: item,
      header: `Detalle Requisición - Folio: ${item.folio}`,
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
          this.toastr.success(`Requisición Autorizada correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Requisición Rechazada correctamente.`);
          this.refreshData();
      }
    });
  }

  processSelected(items) {
    if (items.length <= 0) {
      this.toastr.warning(`Favor de seleccionar al menos una requisición.`);
      return;
    }

    this.ref = this.dialogService.open(RequisitionsAuthorizerFormComponent, {
      data: items,
      header: `Procesar Requisiciones`,
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
          this.toastr.success(`Requisiciones Autorizadas correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Requisiciones Rechazadas correctamente.`);
          this.refreshData();
          break;
      }
    });
  }

  refreshData(): void {
    this.authorizationsRequisitions.refreshData();
  }

}
