import { Routes } from '@angular/router';

import { CommercialInvoiceComponent } from './commercial-invoice.component';
import { CommercialInvoiceListComponent } from './commercial-invoice-list/commercial-invoice-list.component';
import { CommercialInvoiceFormComponent } from './commercial-invoice-form/commercial-invoice-form.component';

export const COMMERCIAL_INVOICE_ROUTER: Routes = [
    {
        path: '', component: CommercialInvoiceComponent,
        children: [
            { path: '', component: CommercialInvoiceListComponent },
            {
                path: 'addCommercialInvoice',
                component: CommercialInvoiceFormComponent,
                data: { breadcrumb: 'Nuevo Commercial Invoice' }
            },
            {
                path: 'editCommercialInvoice/:id',
                component: CommercialInvoiceFormComponent,
                data: { breadcrumb: 'Edición de Commercial Invoice' }
            },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ],
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
