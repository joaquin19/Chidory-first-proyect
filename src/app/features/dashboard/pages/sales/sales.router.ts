import { Routes } from '@angular/router';
import { SalesComponent } from './sales.component';

export const SALES_ROUTER: Routes = [
  {
    path: '', component: SalesComponent, data: { breadcrumb: 'Ventas' },
    children: [
      {
        path: 'sales-report',
        loadChildren: () => import('./pages/sales-support/sales-support.module').then(m => m.SalesSupportModule),
        data: { breadcrumb: 'Reporte de Ventas' }
      },
      {
        path: 'price-list',
        loadChildren: () => import('./pages/price-list/price-list.module').then(m => m.PriceListModule),
        data: { breadcrumb: 'Lista de Precios' }
      },
      {
        path: 'remission',
        loadChildren: () => import('./pages/remission/remission.module').then(m => m.RemissionModule),
        data: { breadcrumb: 'Remisiones' }
      },
      {
        path: 'price-list-authorizer',
        loadChildren: () => import('./pages/price-list-authorizer/price-list-authorizer.module')
          .then(m => m.PriceListAuthorizerModule),
        data: { breadcrumb: 'Autorización de Lista de Precios' }
      },
      {
        path: 'authorization-sales-report',
        loadChildren: () => import('./pages/authorization-sales-report/authorization-sales-report.module')
          .then(m => m.AuthorizationSalesReportModule),
        data: { breadcrumb: 'Autorización de Reporte de Ventas' }
      },
      {
        path: 'packing-list',
        loadChildren: () => import('./pages/packing-list/packing-list.module').then(m => m.PackingListModule),
        data: { breadcrumb: 'Packing List' }
      },
      {
        path: 'commercial-invoice',
        loadChildren: () => import('./pages/commercial-invoice/commercial-invoice.module').then(m => m.CommercialInvoiceModule),
        data: { breadcrumb: 'Commercial Invoice' }
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
