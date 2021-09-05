import { Routes } from '@angular/router';
import { RemissionComponent } from './remission.component';
import { RemissionListComponent } from './remission-list/remission-list.component';
import { RemissionFormComponent } from './remission-form/remission-form.component';

export const REMISSION_ROUTER: Routes = [
  {
    path: '', component: RemissionComponent,
    children: [
      { path: '', component: RemissionListComponent },
      {
        path: 'addRemission', component: RemissionFormComponent,
        data: { breadcrumb: 'Nueva Lista de Remisión' }
      },
      {
        path: 'editRemission/:id', component: RemissionFormComponent,
        data: { breadcrumb: 'Edición de Lista de Remisión' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
