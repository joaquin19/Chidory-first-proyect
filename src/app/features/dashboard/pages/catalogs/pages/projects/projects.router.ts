import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsFormComponent } from './projects-form/projects-form.component';

export const PROJECTS_ROUTER: Routes = [
  {
    path: '', component: ProjectsComponent,
    children: [
      { path: '', component: ProjectsListComponent },
      {
        path: 'addProject', component: ProjectsFormComponent,
        data: { breadcrumb: 'Nuevo Proyecto' }
      },
      {
        path: 'editProject/:id', component: ProjectsFormComponent,
        data: { breadcrumb: 'Edición de Proyecto' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
