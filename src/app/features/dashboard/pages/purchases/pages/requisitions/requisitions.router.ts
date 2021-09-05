import { Routes } from '@angular/router';

import { RequisitionsComponent } from './requisitions.component';
import { RequisitionsListComponent } from './requisitions-list/requisitions-list.component';
import { RequisitionsFormComponent } from './requisitions-form/requisitions-form.component';

export const REQUISITIONS_ROUTER: Routes = [
  {
    path: '', component: RequisitionsComponent,
    children: [
      { path: '', component: RequisitionsListComponent },
      {
        path: 'addRequisition', component: RequisitionsFormComponent,
        data: { breadcrumb: 'Nueva Requisición' }
      },
      {
        path: 'editRequisition/:id', component: RequisitionsFormComponent,
        data: { breadcrumb: 'Edición de Requisición' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
