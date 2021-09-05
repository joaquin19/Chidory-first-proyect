import { Routes } from '@angular/router';

import { PackingListComponent } from './packing-list.component';
import { PackingListListComponent } from './packing-list-list/packing-list-list.component';
import { PackingListFormComponent } from './packing-list-form/packing-list-form.component';

export const PACKING_LIST_ROUTER: Routes = [
    {
        path: '', component: PackingListComponent,
        children: [
            { path: '', component: PackingListListComponent },
            {
                path: 'addPackingList', component: PackingListFormComponent,
                data: { breadcrumb: 'Nuevo Packing List' }
            },
            {
                path: 'editPackingList/:id', component: PackingListFormComponent,
                data: { breadcrumb: 'Edición de Packing List' }
            },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ],
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
