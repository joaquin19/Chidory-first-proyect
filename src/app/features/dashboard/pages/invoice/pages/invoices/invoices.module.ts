import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { RouterModule } from '@angular/router';
import { INVOICES_ROUTER } from './invoices.router';



@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceListComponent,
    InvoiceFormComponent,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(INVOICES_ROUTER),
  ]
})
export class InvoicesModule { }
