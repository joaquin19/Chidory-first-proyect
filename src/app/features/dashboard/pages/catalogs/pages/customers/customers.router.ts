import { Routes } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersFormComponent } from './customers-form/customers-form.component';

export const CUSTOMERS_ROUTER: Routes = [
    {
        path: '', component: CustomersComponent,
        children: [
            { path: '', component: CustomersListComponent },
            { path: 'addCustomer', component: CustomersFormComponent, data: { breadcrumb: 'Agregar Cliente' } },
            { path: 'editCustomer/:id', component: CustomersFormComponent, data: { breadcrumb: 'Editar Cliente' } },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
