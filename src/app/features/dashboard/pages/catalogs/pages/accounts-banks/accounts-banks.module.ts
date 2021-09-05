import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Router

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { AccountsBanksComponent } from './accounts-banks.component';
import { AccountsBanksListComponent } from './accounts-banks-list/accounts-banks-list.component';
import { AccountsBanksFormComponent } from './accounts-banks-form/accounts-banks-form.component';
import { AccountsBanksDetailComponent } from './accounts-banks-detail/accounts-banks-detail.component';
import { RouterModule } from '@angular/router';
import { ACCOUNT_BANKS_ROUTER } from './account-banks.router';


@NgModule({
  declarations: [
    AccountsBanksComponent,
    AccountsBanksListComponent,
    AccountsBanksFormComponent,
    AccountsBanksDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ACCOUNT_BANKS_ROUTER),
  ]
})
export class AccountsBanksModule { }
