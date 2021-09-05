import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { CUSTOMERS_ROUTER } from './customers.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { CustomersFormDetailComponent } from './customers-form-detail/customers-form-detail.component';
import { CustomersContactFormComponent } from './customers-contact-form/customers-contact-form.component';
import { CustomersFinancialFormComponent } from './customers-financial-form/customers-financial-form.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CustomersListComponent,
    CustomersFormComponent,
    CustomersFormDetailComponent,
    CustomersContactFormComponent,
    CustomersFinancialFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CUSTOMERS_ROUTER),
  ]
})
export class CustomersModule { }
