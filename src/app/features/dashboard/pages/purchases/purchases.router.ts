import { Routes } from '@angular/router';

import { PurchasesComponent } from './purchases.component';

export const PURCHASES_ROUTER: Routes = [
  {
    path: '', component: PurchasesComponent, data: { breadcrumb: 'Compras' },
    children: [
      {
        path: 'purchase-orders',
        loadChildren: () => import('./pages/purchase-orders/purchase-orders.module').then(m => m.PurchaseOrdersModule),
        data: { breadcrumb: 'Órdenes de Compra' }
      },
      {
        path: 'requisitions',
        loadChildren: () => import('./pages/requisitions/requisitions.module').then(m => m.RequisitionsModule),
        data: { breadcrumb: 'Requisiciones' }
      },
      {
        path: 'merchandise-reception',
        loadChildren: () => import('./pages/merchandise-reception/merchandise-reception.module').then(m => m.MerchandiseReceptionModule),
        data: { breadcrumb: 'Recepción de Mercancía' }
      },
      {
        path: 'reconciliation',
        loadChildren: () => import('./pages/reconciliation/reconciliation.module').then(m => m.ReconciliationModule),
        data: { breadcrumb: 'Conciliación' }
      },
      {
        path: 'requisitions-authorizer',
        loadChildren: () => import('./pages/requisitions-authorizer/requisitions-authorizer.module')
          .then(m => m.RequisitionsAuthorizerModule),
        data: { breadcrumb: 'Autorización de Requisiciones' }
      },
      {
        path: 'purchase-orders-authorizer',
        loadChildren: () => import('./pages/purchase-orders-authorizer/purchase-orders-authorizer.module')
          .then(m => m.PurchaseOrdersAuthorizerModule),
        data: { breadcrumb: 'Autorización de Órdenes de Compra' }
      },
      {
        path: 'reconciliation-authorizer',
        loadChildren: () => import('./pages/reconciliation-authorizer/reconciliation-authorizer.module')
          .then(m => m.ReconciliationAuthorizerModule),
        data: { breadcrumb: 'Autorización de Conciliaciones' }
      }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
