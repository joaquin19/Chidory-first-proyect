import { Routes } from '@angular/router';
import { AuthorizationSalesReportComponent } from './authorization-sales-report.component';
import { AuthorizationSalesReportListComponent } from './authorization-sales-report-list/authorization-sales-report-list.component';

export const AUTHORIZATION_SALES_REPORT_ROUTER: Routes = [
  {
    path: '', component: AuthorizationSalesReportComponent,
    children: [
        { path: '', component: AuthorizationSalesReportListComponent },
        { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
