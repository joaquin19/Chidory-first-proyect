import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { PURCHASE_ORDERS_AUTHORIZER_ROUTER } from './purchase-orders-authorizer.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { PurchaseOrdersAuthorizerComponent } from './purchase-orders-authorizer.component';
import { PurchaseOrdersAuthorizerListComponent } from './purchase-orders-authorizer-list/purchase-orders-authorizer-list.component';
import { PurchaseOrdersAuthorizerDetailFormComponent } from './purchase-orders-authorizer-detail-form/purchase-orders-authorizer-detail-form.component';
import { PurchaseOrdersAuthorizerFormComponent } from './purchase-orders-authorizer-form/purchase-orders-authorizer-form.component';

@NgModule({
  declarations: [
    PurchaseOrdersAuthorizerComponent,
    PurchaseOrdersAuthorizerListComponent,
    PurchaseOrdersAuthorizerDetailFormComponent,
    PurchaseOrdersAuthorizerFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PURCHASE_ORDERS_AUTHORIZER_ROUTER)
  ]
})
export class PurchaseOrdersAuthorizerModule { }
