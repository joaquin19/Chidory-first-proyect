import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { PURCHASE_ORDERS_SEARCH_ROUTER } from './purchase-orders-search.router';

// Modules
import { SharedModule } from '@app/shared/shared.module';

// Components
import { PurchaseOrdersSearchComponent } from './purchase-orders-search.component';

@NgModule({
  declarations: [
    PurchaseOrdersSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PURCHASE_ORDERS_SEARCH_ROUTER)
  ]
})
export class PurchaseOrdersSearchModule { }
