import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceSheetFormComponent } from './balance-sheet-form/balance-sheet-form.component';
import { BalanceSheetListComponent } from './balance-sheet-list/balance-sheet-list.component';
import { BalanceSheetComponent } from './balance-sheet.component';
import { BalanceSheetDetailComponent } from './balance-sheet-detail/balance-sheet-detail.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { BalanceSheetDataComponent } from './balance-sheet-data/balance-sheet-data.component';
import { IncomeStatementComponent } from './income-statement/income-statement.component';
import { ProductionComponent } from './production/production.component';
import { RouterModule } from '@angular/router';
import { BALANCE_SHEET_ROUTER } from './balance-sheet.router';



@NgModule({
  declarations: [
    BalanceSheetComponent,
    BalanceSheetFormComponent,
    BalanceSheetListComponent,
    BalanceSheetDetailComponent,
    BalanceSheetDataComponent,
    IncomeStatementComponent,
    ProductionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(BALANCE_SHEET_ROUTER),
  ]
})
export class BalanceSheetModule { }
