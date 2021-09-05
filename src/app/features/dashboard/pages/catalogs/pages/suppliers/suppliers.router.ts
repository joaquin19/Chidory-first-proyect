import { Routes } from '@angular/router';

import { SuppliersComponent } from './suppliers.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SuppliersFormComponent } from './suppliers-form/suppliers-form.component';

export const SUPPLIERS_ROUTER: Routes = [
    {
        path: '', component: SuppliersComponent,
        children: [
            { path: '', component: SuppliersListComponent },
            { path: 'addSupplier', component: SuppliersFormComponent, data: { breadcrumb: 'Agregar Proveedor' } },
            { path: 'editSupplier/:id', component: SuppliersFormComponent, data: { breadcrumb: 'Editar Proveedor' } },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
