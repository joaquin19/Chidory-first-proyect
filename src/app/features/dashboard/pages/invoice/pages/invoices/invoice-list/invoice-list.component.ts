import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class InvoiceListComponent implements OnInit, OnDestroy {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colInvoice: any;
  public listInvoice: any;
  public loadingTable: boolean;
  public navHeader: any[];
  public cardValue: any;
  public valueStep = 1;
  public ref: DynamicDialogRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public messageService: MessageService
   ) {
    this.colInvoice = [];
    this.listInvoice = [];
    this.cardValue = [
      { id: 1, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Venta' },
      { id: 2, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Compra' },
      { id: 3, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Venta' },
      { id: 4, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Venta' },
      { id: 5, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Compra' },
      { id: 6, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Compra' }
    ];
    this.navHeader = [
      { icon: 'pi pi-align-left', value: 1, label: 'Facturas' },
      { icon: 'pi pi-plus-circle', value: 2, label: 'Nuevo' },
      { icon: 'pi pi-info-circle', value: 3, label: 'Inforrmacion de la Compañia' },
      { icon: 'pi pi-credit-card', value: 4, label: 'Cuenta Bancaria' },
      { icon: 'pi pi-shield', value: 5, label: 'Ejercicio Fiscal'}
    ];
    this.loadingTable = false;
   }

  ngOnInit(): void {
    this.colInvoice = [
      {field: 'noControl', header: 'No. Control'},
      {field: 'customer', header: 'Cliente'},
      {field: 'date', header: 'Fecha'},
      {field: 'dateDrive', header: 'Fecha Entrega'},
      {field: 'status', header: 'Estatus'},
    ];
    this.listInvoice = [
      {
        id: 1,
        noControl: 'F5552',
        customer: 'Hanon - Climate Systems Mexicana Monterrey Plant',
        date: '10/08/2020',
        dateDrive: '10/08/2020',
        status: 'Pre-Factura'
      },
      {
        id: 2,
        noControl: 'F5841',
        customer: 'Hanon - Climate Systems Mexicana Monterrey Plant',
        date: '17/08/2020',
        dateDrive: '25/08/2020',
        status: 'Sin Aprobar'
      }
    ];
  }

  deleteItem(event): void {
    this.confirmationService.confirm({
        message: 'Esta Seguro de Borrar esta Factura?',
        header: 'Borrar Factura',
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

  showDetailInvoice(): void {
    this.ref = this.dialogService.open(InvoiceFormComponent, {
        header: 'Detalle de Factura',
        width: '95%',
        contentStyle: {'max-height': '500px', overflow: 'auto'},
        baseZIndex: 10000
    });
  }

  ngOnDestroy(): void {
      if (this.ref) {
          this.ref.close();
      }
  }

  showInvoiceType(value): void {
    this.valueStep = value;
  }

  refreshData(): void {
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.colInvoice) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Facturas`, true, headersExcel);
  }

  detailItem(event): void {
    this.ref = this.dialogService.open(InvoiceDetailComponent, {
      header: 'Detalle Facturas',
      width: '70%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
  });
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/invoice/invoices/editInvoice/${event.id}`]);
    console.log('editItem', event.id);
  }

}
