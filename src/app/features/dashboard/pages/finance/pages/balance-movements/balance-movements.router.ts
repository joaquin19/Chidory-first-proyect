import { Routes } from '@angular/router';
import { BalanceMovementsComponent } from './balance-movements.component';
import { BalanceMovementsListComponent } from './balance-movements-list/balance-movements-list.component';
import { BalanceMovementsFormComponent } from './balance-movements-form/balance-movements-form.component';


export const BALANCE_MOVEMENTS_ROUTER: Routes = [
  {
    path: '', component: BalanceMovementsComponent,
    children: [
      { path: '', component: BalanceMovementsListComponent },
      {
        path: 'addBalanceMovement', component: BalanceMovementsFormComponent,
        data: { breadcrumb: 'Nuevo Saldo' }
      },
      {
        path: 'editBalanceMovement/:id', component: BalanceMovementsFormComponent,
        data: { breadcrumb: 'Edición de Saldo' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
