import { Routes } from '@angular/router';

import { ReconciliationAuthorizerComponent } from './reconciliation-authorizer.component';
import { ReconciliationAuthorizerListComponent } from './reconciliation-authorizer-list/reconciliation-authorizer-list.component';


export const RECONCILIATION_AUTHORIZER_ROUTER: Routes = [
    {
        path: '', component: ReconciliationAuthorizerComponent,
        children: [
            { path: '', component: ReconciliationAuthorizerListComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
