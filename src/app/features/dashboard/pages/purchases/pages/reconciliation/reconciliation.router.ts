import { Routes } from '@angular/router';

import { ReconciliationComponent } from './reconciliation.component';
import { ReconciliationFormComponent } from './reconciliation-form/reconciliation-form.component';
import { ReconciliationListComponent } from './reconciliation-list/reconciliation-list.component';
import { ReconciliationEditionFormComponent } from './reconciliation-edition-form/reconciliation-edition-form.component';
import { ReconciliationDetailFormComponent } from './reconciliation-detail-form/reconciliation-detail-form.component';

export const RECONCILIATION_ROUTER: Routes = [
  {
    path: '', component: ReconciliationComponent,
    children: [
      { path: '', component: ReconciliationListComponent },
      {
        path: 'addReconciliation', component: ReconciliationFormComponent,
        data: { breadcrumb: 'Órdenes de Compra a Conciliar' }
      },
      {
        path: 'editReconciliation/:id', component: ReconciliationEditionFormComponent,
        data: { breadcrumb: 'Edición de Conciliación' }
      },
      {
        path: 'detailReconciliation/:id', component: ReconciliationDetailFormComponent,
        data: { breadcrumb: 'Detalle de Conciliación' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
