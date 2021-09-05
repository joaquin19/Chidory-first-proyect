import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { SUPPLIERS_ROUTER } from './suppliers.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { SuppliersComponent } from './suppliers.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SuppliersFormComponent } from './suppliers-form/suppliers-form.component';
import { SuppliersFormDetailComponent } from './suppliers-form-detail/suppliers-form-detail.component';
import { SuppliersContactFormComponent } from './suppliers-contact-form/suppliers-contact-form.component';
import { SuppliersFinancialFormComponent } from './suppliers-financial-form/suppliers-financial-form.component';


@NgModule({
  declarations: [
    SuppliersComponent,
    SuppliersListComponent,
    SuppliersFormComponent,
    SuppliersFormDetailComponent,
    SuppliersContactFormComponent,
    SuppliersFinancialFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(SUPPLIERS_ROUTER)
  ]
})
export class SuppliersModule { }
