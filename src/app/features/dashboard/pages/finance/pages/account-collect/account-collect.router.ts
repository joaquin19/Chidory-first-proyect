import { Routes } from '@angular/router';
import { AccountCollectComponent } from './account-collect.component';
import { AccountCollectListComponent } from './account-collect-list/account-collect-list.component';
import { AccountCollectFormComponent } from './account-collect-form/account-collect-form.component';

export const ACCOUNT_COLLECT_ROUTER: Routes = [
  {
    path: '', component: AccountCollectComponent,
    children: [
      { path: '', component: AccountCollectListComponent },
      {
        path: 'addAccountCollect', component: AccountCollectFormComponent,
        data: { breadcrumb: 'Nueva Cuenta por Cobrar' }
      },
      {
        path: 'editAccountCollect/:id', component: AccountCollectFormComponent,
        data: { breadcrumb: 'Edición de  Cuenta por Cobrar' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
