import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
    public colInvoice: any;
    public listInvoice: any;

    constructor(
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig
      ) {
        this.colInvoice = [];
        this.listInvoice = [];
      }

    ngOnInit(): void {
      this.colInvoice = [
        {width: 'col-w lg', field: 'noControl', header: 'No. Control'},
        {width: 'col-w lg', field: 'customer', header: 'Cliente'},
        {width: 'col-w lg', field: 'date', header: 'Fecha'},
        {width: 'col-w lg', field: 'dateDrive', header: 'Fecha Entrega'},
        {width: 'col-w lg', field: 'status', header: 'Estatus'},
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

    selectProduct(listDetailInvoice): void {
        this.ref.close(listDetailInvoice);
    }
}
