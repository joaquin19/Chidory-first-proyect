import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
    public colDetailInvoice: any;
    public listDetailInvoice: any;

    constructor(
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig
      ) {
        this.colDetailInvoice = [];
        this.listDetailInvoice = [];
      }

    ngOnInit(): void {
      this.colDetailInvoice = [
        {field: 'name', header: 'Razon Social'},
        {field: 'invoiceNumber', header: 'Numero de Factura'},
        {field: 'status', header: 'Estatus'},
      ];
      this.listDetailInvoice = [
        { id: 1, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Venta' },
      { id: 2, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Compra' },
      { id: 3, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Venta' },
      { id: 4, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Venta' },
      { id: 5, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Compra' },
      { id: 6, name: 'KRAEM SA de CV', invoiceNumber: 'F23', status: 'Compra' }
      ];
    }

    selectProduct(listDetailInvoice): void {
        this.ref.close(listDetailInvoice);
    }
}
