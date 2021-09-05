import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPayableComponent } from './account-payable.component';
import { AccountPayableListComponent } from './account-payable-list/account-payable-list.component';
import { AccountPayableFormComponent } from './account-payable-form/account-payable-form.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { AccountPayableDetailComponent } from './account-payable-detail/account-payable-detail.component';
import { RouterModule } from '@angular/router';
import { ACCOUNT_PAYABLE_ROUTER } from './account-payable.router';



@NgModule({
  declarations: [
    AccountPayableComponent,
    AccountPayableListComponent,
    AccountPayableFormComponent,
    AccountPayableDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ACCOUNT_PAYABLE_ROUTER),
  ]
})
export class AccountPayableModule { }
