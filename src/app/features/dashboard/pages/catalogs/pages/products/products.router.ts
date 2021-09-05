import { Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsImportComponent } from './products-import/products-import.component';

export const PRODUCTS_ROUTER: Routes = [
  {
    path: '', component: ProductsComponent,
    children: [
      { path: '', component: ProductsListComponent },
      { path: 'addProduct', component: ProductsFormComponent, data: { breadcrumb: 'Agregar Producto' } },
      { path: 'editProduct/:id', component: ProductsFormComponent, data: { breadcrumb: 'Editar Producto' } },
      { path: 'importProduct', component: ProductsImportComponent, data: { breadcrumb: 'Importar Productos' } },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
