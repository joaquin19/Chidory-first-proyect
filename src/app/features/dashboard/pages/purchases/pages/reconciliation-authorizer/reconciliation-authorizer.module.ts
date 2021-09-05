import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { RECONCILIATION_AUTHORIZER_ROUTER } from './reconciliation-authorizer.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { ReconciliationAuthorizerComponent } from './reconciliation-authorizer.component';
import { ReconciliationAuthorizerListComponent } from './reconciliation-authorizer-list/reconciliation-authorizer-list.component';
import { ReconciliationAuthorizerDetailFormComponent } from './reconciliation-authorizer-detail-form/reconciliation-authorizer-detail-form.component';
import { ReconciliationAuthorizerFormComponent } from './reconciliation-authorizer-form/reconciliation-authorizer-form.component';

@NgModule({
  declarations: [
    ReconciliationAuthorizerComponent,
    ReconciliationAuthorizerListComponent,
    ReconciliationAuthorizerDetailFormComponent,
    ReconciliationAuthorizerFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(RECONCILIATION_AUTHORIZER_ROUTER)
  ]
})
export class ReconciliationAuthorizerModule { }
