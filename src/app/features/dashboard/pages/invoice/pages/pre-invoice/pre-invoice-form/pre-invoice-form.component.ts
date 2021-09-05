import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-pre-invoice-form',
  templateUrl: './pre-invoice-form.component.html',
  styleUrls: ['./pre-invoice-form.component.scss']
})
export class PreInvoiceFormComponent implements OnInit {

  public pageRedirect: string;
  public colPreInvoice: any;
  public listPreInvoice: any;

  constructor() {
    this.pageRedirect = '/dashboard/invoice/pre-invoice';
    this.colPreInvoice = [];
    this.listPreInvoice = [];
   }

  ngOnInit(): void {
    this.colPreInvoice = [
      { width: 'col-w md', field: 'number', header: 'NO'},
      { width: 'col-w md', field: 'quantity', header: 'CANTIDAD'},
      { width: 'col-w lg', field: 'partNumber', header: 'NO. PARTE'},
      { width: 'col-w xxl', field: 'partName', header: 'NOMBRE DE PARTE'},
      { width: 'col-w xxl', field: 'unitMeasure', header: 'CLAVE UNIDAD DE MEDIDA'},
      { width: 'col-w xxl', field: 'productId', header: 'CLAEV PRODUCTO SERV.'},
    ];
    this.listPreInvoice = [
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

}
