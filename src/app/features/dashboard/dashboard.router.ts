import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTER: Routes = [
  {
    path: '', component: DashboardComponent, data: { breadcrumb: 'Inicio' },
    children: [
      {
        path: 'catalogs',
        loadChildren: () => import('./pages/catalogs/catalogs.module').then(m => m.CatalogsModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./pages/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'finance',
        loadChildren: () => import('./pages/finance/finance.module').then(m => m.FinanceModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesModule)
      },
      {
        path: 'purchases',
        loadChildren: () => import('./pages/purchases/purchases.module').then(m => m.PurchasesModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryModule)
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
