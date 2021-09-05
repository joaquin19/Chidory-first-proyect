import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PurchasesComponent } from './purchases.component';
import { PURCHASES_ROUTER } from './purchases.router';


@NgModule({
  declarations: [
    PurchasesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PURCHASES_ROUTER),
  ]
})
export class PurchasesModule { }


