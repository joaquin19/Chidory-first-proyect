import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreInvoiceComponent } from './pre-invoice.component';
import { PreInvoiceListComponent } from './pre-invoice-list/pre-invoice-list.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { PreInvoiceFormComponent } from './pre-invoice-form/pre-invoice-form.component';
import { PreInvoiceDetailComponent } from './pre-invoice-detail/pre-invoice-detail.component';
import { RouterModule } from '@angular/router';
import { PRE_INVOICE_ROUTER } from './pre-invoice.router';


@NgModule({
  declarations: [
    PreInvoiceComponent,
    PreInvoiceListComponent,
    PreInvoiceFormComponent,
    PreInvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PRE_INVOICE_ROUTER),
  ]
})
export class PreInvoiceModule { }
