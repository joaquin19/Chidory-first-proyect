import { Routes } from '@angular/router';

import { PurchaseOrdersSearchComponent } from './purchase-orders-search.component';

export const PURCHASE_ORDERS_SEARCH_ROUTER: Routes = [
    {
        path: '', component: PurchaseOrdersSearchComponent, data: { breadcrumb: 'Búsqueda de Órdenes de Compra' }
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
