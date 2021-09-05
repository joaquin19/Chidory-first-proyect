import { Routes } from '@angular/router';
import { PreInvoiceComponent } from './pre-invoice.component';
import { PreInvoiceListComponent } from './pre-invoice-list/pre-invoice-list.component';
import { PreInvoiceFormComponent } from './pre-invoice-form/pre-invoice-form.component';

export const PRE_INVOICE_ROUTER: Routes = [
  {
    path: '', component: PreInvoiceComponent,
    children: [
      { path: '', component: PreInvoiceListComponent },
      {
        path: 'addPreInvoice', component: PreInvoiceFormComponent,
        data: { breadcrumb: 'Nueva Pre-Factura' }
      },
      {
        path: 'editPreInvoice/:id', component: PreInvoiceFormComponent,
        data: { breadcrumb: 'Edición de Pre-Factura' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
