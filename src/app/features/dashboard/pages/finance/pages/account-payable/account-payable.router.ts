import { Routes } from '@angular/router';
import { AccountPayableComponent } from './account-payable.component';
import { AccountPayableListComponent } from './account-payable-list/account-payable-list.component';
import { AccountPayableFormComponent } from './account-payable-form/account-payable-form.component';


export const ACCOUNT_PAYABLE_ROUTER: Routes = [
  {
    path: '', component: AccountPayableComponent,
    children: [
      { path: '', component: AccountPayableListComponent },
      {
        path: 'addAccountPayable', component: AccountPayableFormComponent,
        data: { breadcrumb: 'Nueva Cuenta por Pagar' }
      },
      {
        path: 'editAccountPayable/:id', component: AccountPayableFormComponent,
        data: { breadcrumb: 'Edición de Cuenta por  Pagar' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
