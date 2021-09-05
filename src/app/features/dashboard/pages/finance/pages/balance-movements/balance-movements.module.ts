import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceMovementsListComponent } from './balance-movements-list/balance-movements-list.component';
import { BalanceMovementsDetailComponent } from './balance-movements-detail/balance-movements-detail.component';
import { BalanceMovementsFormComponent } from './balance-movements-form/balance-movements-form.component';
import { BalanceMovementsComponent } from './balance-movements.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BALANCE_MOVEMENTS_ROUTER } from './balance-movements.router';



@NgModule({
  declarations: [
    BalanceMovementsComponent,
    BalanceMovementsListComponent,
    BalanceMovementsDetailComponent,
    BalanceMovementsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(BALANCE_MOVEMENTS_ROUTER),
  ]
})
export class BalanceMovementsModule { }
