import { Routes } from '@angular/router';
import { ProductExportComponent } from './product-export.component';
import { ProductExportListComponent } from './product-export-list/product-export-list.component';
import { ProductExportFormComponent } from './product-export-form/product-export-form.component';

export const PRODUCTS_EXPORT_ROUTER: Routes = [
  {
    path: '', component: ProductExportComponent,
    children: [
      { path: '', component: ProductExportListComponent },
      {
        path: 'addProductExport', component: ProductExportFormComponent,
        data: { breadcrumb: 'Nuevo de Producto de Exportación' }
      },
      {
        path: 'editProductExport/:id', component: ProductExportFormComponent,
        data: { breadcrumb: 'Editar de Producto de Exportación' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
