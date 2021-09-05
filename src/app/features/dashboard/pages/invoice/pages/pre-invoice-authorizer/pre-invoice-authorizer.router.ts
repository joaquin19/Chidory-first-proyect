import { Routes } from '@angular/router';

import { PreInvoiceAuthorizerComponent } from './pre-invoice-authorizer.component';
import { PreInvoiceAuthorizerListComponent } from './pre-invoice-authorizer-list/pre-invoice-authorizer-list.component';


export const PRE_INVOICE_AUTHORIZER_ROUTER: Routes = [
    {
        path: '', component: PreInvoiceAuthorizerComponent,
        children: [
            { path: '', component: PreInvoiceAuthorizerListComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
