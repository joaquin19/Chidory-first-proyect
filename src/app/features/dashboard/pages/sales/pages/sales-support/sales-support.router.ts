import { Routes } from '@angular/router';
import { SalesSupportComponent } from './sales-support.component';
import { SalesSupportListComponent } from './sales-support-list/sales-support-list.component';
import { SalesSupportFormComponent } from './sales-support-form/sales-support-form.component';

export const SALES_SUPPORT_ROUTER: Routes = [
  {
    path: '', component: SalesSupportComponent,
    children: [
      { path: '', component: SalesSupportListComponent },
      {
        path: 'addSalesReport', component: SalesSupportFormComponent,
        data: { breadcrumb: 'Nuevo  Reporte de Venta' }
      },
      {
        path: 'editSalesReport/:id', component: SalesSupportFormComponent,
        data: { breadcrumb: 'Edición de Reporte de Venta' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
