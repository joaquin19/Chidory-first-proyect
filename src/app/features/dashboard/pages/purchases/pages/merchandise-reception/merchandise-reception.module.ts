import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { MERCHANDISERECEPTION_ROUTER } from './merchandise-reception.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { MerchandiseReceptionComponent } from './merchandise-reception.component';
import { MerchandiseReceptionListComponent } from './merchandise-reception-list/merchandise-reception-list.component';
import { MerchandiseReceptionFormComponent } from './merchandise-reception-form/merchandise-reception-form.component';
import { MerchandiseReceptionDetailModalComponent } from './merchandise-reception-detail-modal/merchandise-reception-detail-modal.component';
import { MerchandiseReceptionArticleModalComponent } from './merchandise-reception-article-modal/merchandise-reception-article-modal.component';


@NgModule({
  declarations: [
    MerchandiseReceptionComponent,
    MerchandiseReceptionListComponent,
    MerchandiseReceptionFormComponent,
    MerchandiseReceptionDetailModalComponent,
    MerchandiseReceptionArticleModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(MERCHANDISERECEPTION_ROUTER),
  ]
})
export class MerchandiseReceptionModule { }
