import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { PURCHASEORDERS_ROUTER } from './purchase-orders.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { PurchaseOrdersComponent } from './purchase-orders.component';
import { PurchaseOrdersListComponent } from './purchase-orders-list/purchase-orders-list.component';
import { PurchaseOrdersFormComponent } from './purchase-orders-form/purchase-orders-form.component';
import { PurchaseOrdersDetailModalComponent } from './purchase-orders-detail-modal/purchase-orders-detail-modal.component';
import { PurchaseOrdersArticleModalComponent } from './purchase-orders-article-modal/purchase-orders-article-modal.component';


@NgModule({
  declarations: [
    PurchaseOrdersComponent,
    PurchaseOrdersListComponent,
    PurchaseOrdersFormComponent,
    PurchaseOrdersDetailModalComponent,
    PurchaseOrdersArticleModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PURCHASEORDERS_ROUTER),
  ]
})
export class PurchaseOrdersModule { }
