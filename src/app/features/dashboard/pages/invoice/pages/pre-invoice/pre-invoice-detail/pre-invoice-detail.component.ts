import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';

@Component({
  selector: 'app-pre-invoice-detail',
  templateUrl: './pre-invoice-detail.component.html',
  styleUrls: ['./pre-invoice-detail.component.scss']
})
export class PreInvoiceDetailComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colDetailPreInvoice: any;
  public listDetailPreInvoice: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.colDetailPreInvoice = [];
    this.listDetailPreInvoice = [];
   }

  ngOnInit(): void {
    this.colDetailPreInvoice = [
      { width: 'col-w lg', field: 'number', header: 'NO'},
      { width: 'col-w lg', field: 'quantity', header: 'CANTIDAD'},
      { width: 'col-w lg', field: 'partNumber', header: 'NO. PARTE'},
      { width: 'col-w xxl', field: 'partName', header: 'NOMBRE DE PARTE'},
      { width: 'col-w xxl', field: 'unitMeasure', header: 'CLAVE UNIDAD DE MEDIDA'},
      { width: 'col-w xxl', field: 'productId', header: 'CLAEV PRODUCTO SERV.'},
    ];
    this.listDetailPreInvoice = [
      {
        id: 1,
        number: '23',
        quantity: '485',
        partNumber: 'FZR-345',
        partName: 'Model HRF45',
        unitMeasure: 'KG',
        productId: 'R-456'
      }
    ];
  }

  selectProduct(listDetailPreInvoice): void {
    this.ref.close(listDetailPreInvoice);
}

}
