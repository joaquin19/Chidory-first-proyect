import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { PRICE_LIST_AUTHORIZER_ROUTER } from './price-list-authorizer.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { PriceListAuthorizerComponent } from './price-list-authorizer.component';
import { PriceListAuthorizerListComponent } from './price-list-authorizer-list/price-list-authorizer-list.component';
import { PriceListAuthorizerDetailFormComponent } from './price-list-authorizer-detail-form/price-list-authorizer-detail-form.component';
import { PriceListAuthorizerFormComponent } from './price-list-authorizer-form/price-list-authorizer-form.component';


@NgModule({
  declarations: [
    PriceListAuthorizerComponent,
    PriceListAuthorizerListComponent,
    PriceListAuthorizerDetailFormComponent,
    PriceListAuthorizerFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PRICE_LIST_AUTHORIZER_ROUTER)
  ]
})
export class PriceListAuthorizerModule { }
