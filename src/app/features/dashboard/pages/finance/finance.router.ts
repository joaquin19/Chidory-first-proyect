import { Routes } from '@angular/router';
import { FinanceComponent } from './finance.component';
import { BalanceMovementsModule } from './pages/balance-movements/balance-movements.module';


export const FINANCE_ROUTER: Routes = [
  {
    path: '', component: FinanceComponent, data: { breadcrumb: 'Finanzas' },
    children: [
      {
        path: 'account-collect',
        loadChildren: () => import('./pages/account-collect/account-collect.module').then(m => m.AccountCollectModule),
        data: { breadcrumb: 'Cuentas por Cobrar' },
      },
      {
        path: 'account-payable',
        loadChildren: () => import('./pages/account-payable/account-payable.module').then(m => m.AccountPayableModule),
        data: { breadcrumb: 'Cuentas por Pagar' },
      },
      {
        path: 'balance-sheet',
        loadChildren: () => import('./pages/balance-sheet/balance-sheet.module').then(m => m.BalanceSheetModule),
        data: { breadcrumb: 'Balance' },
      },
      {
        path: 'balance-movements',
        loadChildren: () => import('./pages/balance-movements/balance-movements.module').then(m => m.BalanceMovementsModule),
        data: { breadcrumb: 'Saldos' },
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
