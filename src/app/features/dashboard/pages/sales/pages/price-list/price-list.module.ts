import { NgModule } from '@angular/core';
import { PriceListComponent } from './price-list.component';
import { PriceListListComponent } from './price-list-list/price-list-list.component';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { PriceListDetailComponent } from './price-list-detail/price-list-detail.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRICE_LIST_ROUTER } from './price-list.router';
import { SharedModule } from '../../../../../../shared/shared.module';



@NgModule({
  declarations: [
    PriceListComponent,
    PriceListListComponent,
    PriceListFormComponent,
    PriceListDetailComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(PRICE_LIST_ROUTER),
  ]
})
export class PriceListModule { }
