import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { PACKING_LIST_ROUTER } from './packing-list.router';

// Modules
import { SharedModule } from '@app/shared/shared.module';

// Components
import { PackingListComponent } from './packing-list.component';
import { PackingListListComponent } from './packing-list-list/packing-list-list.component';
import { PackingListFormComponent } from './packing-list-form/packing-list-form.component';
import { PackingListDetailFormComponent } from './packing-list-detail-form/packing-list-detail-form.component';
import { PackingListFormProductComponent } from './packing-list-form-product/packing-list-form-product.component';

@NgModule({
  declarations: [
    PackingListComponent,
    PackingListListComponent,
    PackingListFormComponent,
    PackingListDetailFormComponent,
    PackingListFormProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PACKING_LIST_ROUTER)
  ]
})
export class PackingListModule { }
