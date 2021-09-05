import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { AuthorizationSalesReportFormComponent } from '../authorization-sales-report-form/authorization-sales-report-form.component';
import { AuthorizationSalesReportDetailComponent } from '../authorization-sales-report-detail/authorization-sales-report-detail.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationsComponent } from '@app/shared/components/authorizations/authorizations.component';

@Component({
  selector: 'app-authorization-sales-report-list',
  templateUrl: './authorization-sales-report-list.component.html',
  styleUrls: ['./authorization-sales-report-list.component.scss']
})
export class AuthorizationSalesReportListComponent implements OnInit {

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
    this.processType = ProcessType.SalesReport;
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
    this.ref = this.dialogService.open(AuthorizationSalesReportDetailComponent, {
      data: item,
      header: `Detalle del Reporte de Venta - Folio: ${item.folio}`,
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
          this.toastr.success(`Reporte de Venta Autorizada correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Reporte de Venta Rechazada correctamente.`);
          this.refreshData();
      }
    });
  }

  processSelected(items): void {
    if (items.length <= 0) {
      this.toastr.warning(`Favor de seleccionar al menos un reporte de venta.`);
      return;
    }

    this.ref = this.dialogService.open(AuthorizationSalesReportFormComponent, {
      data: items,
      header: `Procesar Reporte de Ventas`,
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
          this.toastr.success(`Reporte de Ventas Autorizadas correctamente`);
          this.refreshData();
          break;
        case AuthorizationStatus.Rejected:
          this.toastr.success(`Reporte de Ventas Rechazadas correctamente.`);
          this.refreshData();
          break;
      }
    });
  }

  refreshData(): void {
    this.authorizationsRequisitions.refreshData();
  }
}
