import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalesComponent } from './sales.component';
import { SALES_ROUTER } from './sales.router';


@NgModule({
  declarations: [
    SalesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SALES_ROUTER),
  ]
})
export class SalesModule { }
