import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { PRE_INVOICE_AUTHORIZER_ROUTER } from './pre-invoice-authorizer.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { PreInvoiceAuthorizerComponent } from './pre-invoice-authorizer.component';
import { PreInvoiceAuthorizerListComponent } from './pre-invoice-authorizer-list/pre-invoice-authorizer-list.component';
import { PreInvoiceAuthorizerDetailFormComponent } from './pre-invoice-authorizer-detail-form/pre-invoice-authorizer-detail-form.component';

@NgModule({
  declarations: [
    PreInvoiceAuthorizerComponent,
    PreInvoiceAuthorizerListComponent,
    PreInvoiceAuthorizerDetailFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PRE_INVOICE_AUTHORIZER_ROUTER)
  ]
})
export class PreInvoiceAuthorizerModule { }
