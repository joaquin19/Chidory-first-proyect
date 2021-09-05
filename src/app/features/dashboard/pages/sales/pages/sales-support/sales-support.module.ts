import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalesSupportComponent } from './sales-support.component';
import { SalesSupportListComponent } from './sales-support-list/sales-support-list.component';
import { SalesSupportFormComponent } from './sales-support-form/sales-support-form.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SalesSupportDetailComponent } from './sales-support-detail/sales-support-detail.component';
import { SALES_SUPPORT_ROUTER } from './sales-support.router';



@NgModule({
  declarations: [
    SalesSupportComponent,
    SalesSupportListComponent,
    SalesSupportFormComponent,
    SalesSupportDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(SALES_SUPPORT_ROUTER),
  ]
})
export class SalesSupportModule { }
