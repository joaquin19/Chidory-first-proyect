import { Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';

export const SETTINGS_ROUTER: Routes = [
    {
        path: '', component: SettingsComponent, data: { breadcrumb: 'Configuración' },
        children: [
            {
                path: 'profiles',
                loadChildren: () => import('./pages/profiles/profiles.module').then(m => m.ProfilesModule),
                data: { breadcrumb: 'Perfiles' },
            },
            {
                path: 'users',
                loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
                data: { breadcrumb: 'Usuarios' },
            }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
