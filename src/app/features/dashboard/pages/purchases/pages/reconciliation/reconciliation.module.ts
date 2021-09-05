import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { RECONCILIATION_ROUTER } from '../reconciliation/reconciliation.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { ReconciliationComponent } from './reconciliation.component';
import { ReconciliationListComponent } from './reconciliation-list/reconciliation-list.component';
import { ReconciliationFormComponent } from './reconciliation-form/reconciliation-form.component';
import { ReconciliationEditionFormComponent } from './reconciliation-edition-form/reconciliation-edition-form.component';
import { ReconciliationDetailFormComponent } from './reconciliation-detail-form/reconciliation-detail-form.component';


@NgModule({
  declarations: [
    ReconciliationComponent,
    ReconciliationListComponent,
    ReconciliationFormComponent,
    ReconciliationEditionFormComponent,
    ReconciliationDetailFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(RECONCILIATION_ROUTER),
  ]
})
export class ReconciliationModule { }
