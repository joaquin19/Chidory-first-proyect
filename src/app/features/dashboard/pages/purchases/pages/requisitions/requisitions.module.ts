import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { REQUISITIONS_ROUTER } from './requisitions.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { RequisitionsComponent } from './requisitions.component';
import { RequisitionsListComponent } from './requisitions-list/requisitions-list.component';
import { RequisitionsFormComponent } from './requisitions-form/requisitions-form.component';
import { RequisitionsDetailFormComponent } from './requisitions-detail-form/requisitions-detail-form.component';
import { RequisitionsArticleFormComponent } from './requisitions-article-form/requisitions-article-form.component';


@NgModule({
  declarations: [
    RequisitionsComponent,
    RequisitionsListComponent,
    RequisitionsFormComponent,
    RequisitionsDetailFormComponent,
    RequisitionsArticleFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(REQUISITIONS_ROUTER),
  ]
})
export class RequisitionsModule { }
