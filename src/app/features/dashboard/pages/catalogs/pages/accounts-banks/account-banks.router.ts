import { Routes } from '@angular/router';
import { AccountsBanksComponent } from './accounts-banks.component';
import { AccountsBanksListComponent } from './accounts-banks-list/accounts-banks-list.component';
import { AccountsBanksFormComponent } from './accounts-banks-form/accounts-banks-form.component';

export const ACCOUNT_BANKS_ROUTER: Routes = [
  {
    path: '', component: AccountsBanksComponent,
    children: [
      { path: '', component: AccountsBanksListComponent },
      {
        path: 'addAccountBanks', component: AccountsBanksFormComponent,
        data: { breadcrumb: 'Nueva Cuenta Bancaria' }
      },
      {
        path: 'editAccountBanks/:id', component: AccountsBanksFormComponent,
        data: { breadcrumb: 'Edición de Cuenta Bancaria' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
