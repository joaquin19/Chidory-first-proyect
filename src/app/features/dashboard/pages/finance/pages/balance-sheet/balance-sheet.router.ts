import { Routes } from '@angular/router';
import { BalanceSheetComponent } from './balance-sheet.component';
import { BalanceSheetListComponent } from './balance-sheet-list/balance-sheet-list.component';
import { BalanceSheetFormComponent } from './balance-sheet-form/balance-sheet-form.component';

export const BALANCE_SHEET_ROUTER: Routes = [
  {
    path: '', component: BalanceSheetComponent,
    children: [
      { path: '', component: BalanceSheetListComponent },
      {
        path: 'addBalanceSheet', component: BalanceSheetFormComponent,
        data: { breadcrumb: 'Nuevo Reporte' }
      },
      {
        path: 'editBalanceSheet/:id', component: BalanceSheetFormComponent,
        data: { breadcrumb: 'Edición de Reporte' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
