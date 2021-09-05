import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinanceComponent } from './finance.component';
import { FINANCE_ROUTER } from './finance.router';
import { BalanceMovementsComponent } from './pages/balance-movements/balance-movements.component';



@NgModule({
  declarations: [
    FinanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FINANCE_ROUTER),
  ]
})
export class FinanceModule { }
