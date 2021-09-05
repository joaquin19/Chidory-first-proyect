import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { ProcessType, AuthorizationStatus, FormatColumn } from '@app/shared/enums';
import { AuthorizationsComponent } from '@app/shared/components/authorizations/authorizations.component';
import { PriceListAuthorizerDetailFormComponent } from '../price-list-authorizer-detail-form/price-list-authorizer-detail-form.component';
import { PriceListAuthorizerFormComponent } from '../price-list-authorizer-form/price-list-authorizer-form.component';

@Component({
  selector: 'app-price-list-authorizer-list',
  templateUrl: './price-list-authorizer-list.component.html',
  styleUrls: ['./price-list-authorizer-list.component.scss']
})
export class PriceListAuthorizerListComponent implements OnInit {

  @ViewChild('authorizationsPriceList', { static: false })
  public authorizationsPriceList: AuthorizationsComponent;

  public ref: DynamicDialogRef;
  public headers: any;
  public processType: ProcessType;

  constructor(
    public dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.headers = [];
    this.processType = ProcessType.Prices;
  }

  ngOnInit(): void {
    this.headers = [
      { field: 'folio', header: 'Nombre', width: 'col-w xl' },
      { field: 'processTypeName', header: 'Tipo Proceso', width: 'col-w lg' },
      { field: 'fullName', header: 'Autorizador', width: 'col-w lg' },
      { field: 'createBy', header: 'Creado Por', width: 'col-w lg' },
      { field: 'createdOn', header: 'Fecha Creación', width: 'col-w lg', format: FormatColumn.Date }
    ];
  }

  detailAuthorization(item): void {
    this.ref = this.dialogService.open(PriceListAuthorizerDetailFormComponent, {
      data: item,
      header: `Detalle Lista de Precios - ${item.folio}`,
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
          this.toastr.success(`Lista de Precios Autorizada correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Lista de Precios Rechazada correctamente.`);
          this.refreshData();
      }
    });
  }

  processSelected(items): void {
    if (items.length <= 0) {
      this.toastr.warning(`Favor de seleccionar al menos una lista de precios.`);
      return;
    }

    this.ref = this.dialogService.open(PriceListAuthorizerFormComponent, {
      data: items,
      header: `Procesar Lista de Precios`,
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
          this.toastr.success(`Lista de Precios Autorizadas correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Lista de Precios Rechazadas correctamente.`);
          this.refreshData();
          break;
      }
    });
  }

  refreshData(): void {
    this.authorizationsPriceList.refreshData();
  }

}
