import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { ProcessType, AuthorizationStatus, FormatColumn } from '@app/shared/enums';
import { AuthorizationsComponent } from '@app/shared/components/authorizations/authorizations.component';
import { PurchaseOrdersAuthorizerDetailFormComponent } from '../purchase-orders-authorizer-detail-form/purchase-orders-authorizer-detail-form.component';
import { PurchaseOrdersAuthorizerFormComponent } from '../purchase-orders-authorizer-form/purchase-orders-authorizer-form.component';


@Component({
  selector: 'app-purchase-orders-authorizer-list',
  templateUrl: './purchase-orders-authorizer-list.component.html',
  styleUrls: ['./purchase-orders-authorizer-list.component.scss']
})
export class PurchaseOrdersAuthorizerListComponent implements OnInit {

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
    this.processType = ProcessType.PurchaseOrder;
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
    this.ref = this.dialogService.open(PurchaseOrdersAuthorizerDetailFormComponent, {
      data: item,
      header: `Detalle Órden de Compra - Folio: ${item.folio}`,
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
          this.toastr.success(`Órden de Compra Autorizada correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Órden de Compra Rechazada correctamente.`);
          this.refreshData();
      }
    });
  }

  processSelected(items): void {
    if (items.length <= 0) {
      this.toastr.warning(`Favor de seleccionar al menos una órden de compra.`);
      return;
    }

    this.ref = this.dialogService.open(PurchaseOrdersAuthorizerFormComponent, {
      data: items,
      header: `Procesar Órdenes de Compra`,
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
          this.toastr.success(`Órdenes de Compra Autorizadas correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Órdenes de Compra Rechazadas correctamente.`);
          this.refreshData();
          break;
      }
    });
  }

  refreshData(): void {
    this.authorizationsRequisitions.refreshData();
  }

}
