import { Routes } from '@angular/router';

import { PurchaseOrdersAuthorizerComponent } from './purchase-orders-authorizer.component';
import { PurchaseOrdersAuthorizerListComponent } from './purchase-orders-authorizer-list/purchase-orders-authorizer-list.component';


export const PURCHASE_ORDERS_AUTHORIZER_ROUTER: Routes = [
    {
        path: '', component: PurchaseOrdersAuthorizerComponent,
        children: [
            { path: '', component: PurchaseOrdersAuthorizerListComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
