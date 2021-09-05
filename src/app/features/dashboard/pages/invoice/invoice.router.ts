import { Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';


export const INVOICE_ROUTER: Routes = [
  {
    path: '', component: InvoiceComponent, data: { breadcrumb: 'Facturación' },
    children: [
      {
        path: 'invoices',
        loadChildren: () => import('./pages/invoices/invoices.module').then(m => m.InvoicesModule),
        data: { breadcrumb: 'Facturas' },
      },
      {
        path: 'pre-invoice',
        loadChildren: () => import('./pages/pre-invoice/pre-invoice.module').then(m => m.PreInvoiceModule),
        data: { breadcrumb: 'Pre-Facturas' },
      },
      {
        path: 'pre-invoice-authorizer',
        loadChildren: () => import('./pages/pre-invoice-authorizer/pre-invoice-authorizer.module').then(m => m.PreInvoiceAuthorizerModule),
        data: { breadcrumb: 'Autorización de Pre-Facturas' },
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
