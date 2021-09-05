import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { REQUISITIONS_AUTHORIZER_ROUTER } from './requisitions-authorizer.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { RequisitionsAuthorizerComponent } from './requisitions-authorizer.component';
import { RequisitionsAuthorizerListComponent } from './requisitions-authorizer-list/requisitions-authorizer-list.component';
import { RequisitionsAuthorizerDetailFormComponent } from './requisitions-authorizer-detail-form/requisitions-authorizer-detail-form.component';
import { RequisitionsAuthorizerFormComponent } from './requisitions-authorizer-form/requisitions-authorizer-form.component';

@NgModule({
  declarations: [
    RequisitionsAuthorizerComponent,
    RequisitionsAuthorizerListComponent,
    RequisitionsAuthorizerDetailFormComponent,
    RequisitionsAuthorizerFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(REQUISITIONS_AUTHORIZER_ROUTER)
  ]
})
export class RequisitionsAuthorizerModule { }
