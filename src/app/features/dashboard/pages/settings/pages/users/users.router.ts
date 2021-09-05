import { Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';

export const USERS_ROUTER: Routes = [
    {
        path: '', component: UsersComponent,
        children: [
            { path: '', component: UsersListComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
