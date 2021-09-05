import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountCollectComponent } from './account-collect.component';
import { AccountCollectListComponent } from './account-collect-list/account-collect-list.component';
import { AccountCollectFormComponent } from './account-collect-form/account-collect-form.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { AccountCollectDetailComponent } from './account-collect-detail/account-collect-detail.component';
import { ACCOUNT_COLLECT_ROUTER } from './account-collect.router';



@NgModule({
  declarations: [
    AccountCollectComponent,
    AccountCollectListComponent,
    AccountCollectFormComponent,
    AccountCollectDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ACCOUNT_COLLECT_ROUTER),
  ]
})
export class AccountCollectModule { }
