import { Routes } from '@angular/router';

import { ProfilesComponent } from './profiles.component';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { ProfilesFormComponent } from './profiles-form/profiles-form.component';

export const PROFILES_ROUTER: Routes = [
    {
        path: '', component: ProfilesComponent,
        children: [
            { path: '', component: ProfilesListComponent },
            { path: 'addProfile', component: ProfilesFormComponent, data: { breadcrumb: 'Agregar Perfil' } },
            { path: 'editProfile/:id', component: ProfilesFormComponent, data: { breadcrumb: 'Editar Perfil' } },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
