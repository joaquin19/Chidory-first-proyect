import { Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoicesComponent } from './invoices.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';

export const INVOICES_ROUTER: Routes = [
  {
    path: '', component: InvoicesComponent,
    children: [
      { path: '', component: InvoiceListComponent },
      {
        path: 'addInvoice', component: InvoiceFormComponent,
        data: { breadcrumb: 'Nueva Factura' }
      },
      {
        path: 'editInvoice/:id', component: InvoiceFormComponent,
        data: { breadcrumb: 'Edición de Factura' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
