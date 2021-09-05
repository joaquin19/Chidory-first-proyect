import { Routes } from '@angular/router';

import { InventoryComponent } from './inventory.component';

export const INVENTORY_ROUTER: Routes = [
  {
    path: '', component: InventoryComponent, data: { breadcrumb: 'Almacén' },
    children: [
      {
        path: 'entries',
        loadChildren: () => import('./pages/entries/entries.module').then(m => m.EntriesModule),
        data: { breadcrumb: 'Entradas' }
      }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
