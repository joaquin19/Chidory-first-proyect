import { Routes } from '@angular/router';

import { RequisitionsAuthorizerComponent } from './requisitions-authorizer.component';
import { RequisitionsAuthorizerListComponent } from './requisitions-authorizer-list/requisitions-authorizer-list.component';

export const REQUISITIONS_AUTHORIZER_ROUTER: Routes = [
    {
        path: '', component: RequisitionsAuthorizerComponent,
        children: [
            { path: '', component: RequisitionsAuthorizerListComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
