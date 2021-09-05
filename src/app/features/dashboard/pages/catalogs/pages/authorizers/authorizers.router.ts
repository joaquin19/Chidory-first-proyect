import { Routes } from '@angular/router';

import { AuthorizersComponent } from './authorizers.component';
import { AuthorizersListComponent } from './authorizers-list/authorizers-list.component';

export const AUTHORIZERS_ROUTER: Routes = [
    {
        path: '', component: AuthorizersComponent,
        children: [
            { path: '', component: AuthorizersListComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
