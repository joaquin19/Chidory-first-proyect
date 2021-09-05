import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationSalesReportListComponent } from './authorization-sales-report-list/authorization-sales-report-list.component';
import { AuthorizationSalesReportFormComponent } from './authorization-sales-report-form/authorization-sales-report-form.component';
import { AuthorizationSalesReportDetailComponent } from './authorization-sales-report-detail/authorization-sales-report-detail.component';
import { AuthorizationSalesReportComponent } from './authorization-sales-report.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AUTHORIZATION_SALES_REPORT_ROUTER } from './authorization-sales-report.router';



@NgModule({
  declarations: [
    AuthorizationSalesReportComponent,
    AuthorizationSalesReportListComponent,
    AuthorizationSalesReportFormComponent,
    AuthorizationSalesReportDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AUTHORIZATION_SALES_REPORT_ROUTER),
  ]
})
export class AuthorizationSalesReportModule { }
