import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { COMMERCIAL_INVOICE_ROUTER } from './commercial-invoice.router';

// Modules
import { SharedModule } from '@app/shared/shared.module';

// Components
import { CommercialInvoiceComponent } from './commercial-invoice.component';
import { CommercialInvoiceListComponent } from './commercial-invoice-list/commercial-invoice-list.component';
import { CommercialInvoiceFormComponent } from './commercial-invoice-form/commercial-invoice-form.component';
import { CommercialInvoiceDetailFormComponent } from './commercial-invoice-detail-form/commercial-invoice-detail-form.component';

@NgModule({
  declarations: [
    CommercialInvoiceComponent,
    CommercialInvoiceListComponent,
    CommercialInvoiceFormComponent,
    CommercialInvoiceDetailFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(COMMERCIAL_INVOICE_ROUTER)
  ]
})
export class CommercialInvoiceModule { }
