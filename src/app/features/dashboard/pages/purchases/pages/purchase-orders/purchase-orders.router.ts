import { Routes } from '@angular/router';

import { PurchaseOrdersComponent } from './purchase-orders.component';
import { PurchaseOrdersFormComponent } from './purchase-orders-form/purchase-orders-form.component';
import { PurchaseOrdersListComponent } from './purchase-orders-list/purchase-orders-list.component';


export const PURCHASEORDERS_ROUTER: Routes = [
  {
    path: '', component: PurchaseOrdersComponent,
    children: [
      { path: '', component: PurchaseOrdersListComponent },
      {
        path: 'addPurchaseOrder', component: PurchaseOrdersFormComponent,
        data: { breadcrumb: 'Nueva de Orden de Compra' }
      },
      {
        path: 'editPurchaseOrder/:id', component: PurchaseOrdersFormComponent,
        data: { breadcrumb: 'Edición de Orden de Compra' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
