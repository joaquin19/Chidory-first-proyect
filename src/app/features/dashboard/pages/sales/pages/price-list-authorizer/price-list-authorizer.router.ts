import { Routes } from '@angular/router';

import { PriceListAuthorizerComponent } from './price-list-authorizer.component';
import { PriceListAuthorizerListComponent } from './price-list-authorizer-list/price-list-authorizer-list.component';

export const PRICE_LIST_AUTHORIZER_ROUTER: Routes = [
    {
        path: '', component: PriceListAuthorizerComponent,
        children: [
            { path: '', component: PriceListAuthorizerListComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
