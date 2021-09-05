import { ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableListComponent } from '../../../../../../../shared/components/table-list/table-list.component';
import { PreInvoiceDetailComponent } from '../pre-invoice-detail/pre-invoice-detail.component';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-pre-invoice-list',
  templateUrl: './pre-invoice-list.component.html',
  styleUrls: ['./pre-invoice-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class PreInvoiceListComponent implements OnInit, OnDestroy {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colPreInvoice: any;
  public listPreInvoice: any;
  public loadingTable: boolean;
  public ref: DynamicDialogRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public messageService: MessageService
   ) {
    this.colPreInvoice = [];
    this.listPreInvoice = [];
    this.loadingTable = false;
   }

  ngOnInit(): void {
    this.colPreInvoice = [
      {width: 'col-w lg', field: 'noControl', header: 'No. Control'},
      {width: 'col-w xl', field: 'customer', header: 'Cliente'},
      {width: 'col-w md', field: 'date', header: 'Fecha'},
      {width: 'col-w xl', field: 'dateDrive', header: 'Fecha Entrega'},
      {width: 'col-w md', field: 'total', header: 'Total'},
      {width: 'col-w md', field: 'status', header: 'Estatus'},
    ];
    this.listPreInvoice = [
      {
        id: 1,
        noControl: 'F5552',
        customer: 'Hanon - Climate Systems Mexicana Monterrey Plant',
        date: '10/08/2020',
        dateDrive: '10/08/2020',
        total: '$ 400.00',
        status: 'Pre-Factura'
      },
      {
        id: 2,
        noControl: 'F5841',
        customer: 'Hanon - Climate Systems Mexicana Monterrey Plant',
        date: '17/08/2020',
        dateDrive: '25/08/2020',
        total: '$ 12,459.34',
        status: 'Sin Aprobar'
      }
    ];
  }

  ngOnDestroy(): void {
    if (this.ref) {
        this.ref.close();
    }
  }

  refreshData(): void {
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.colPreInvoice) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Pre-Facturas`, true, headersExcel);
  }

  detailItem(event): void {
    this.ref = this.dialogService.open(PreInvoiceDetailComponent, {
      header: 'Detalle de Pre-Facturas',
      width: '95%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
    });
  }

  deleteItem(event): void {
    this.confirmationService.confirm({
        message: 'Esta Seguro de Borrar esta Pre-Factura?',
        header: 'Borrar Pre-Factura',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-danger',
        rejectVisible: false,
        accept: () => {
          this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Se ha Borrado Exitosamente'});
        }
    });
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/invoice/pre-invoice/editPreInvoice/${event.id}`]);
    console.log('editItem', event.id);
  }

}
