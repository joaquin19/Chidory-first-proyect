import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { INVOICE_ROUTER } from './invoice.router';


@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(INVOICE_ROUTER),
  ]
})
export class InvoiceModule { }
