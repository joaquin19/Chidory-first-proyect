import { Routes } from '@angular/router';

import { CatalogsComponent } from './catalogs.component';
import { ProductExportModule } from './pages/product-export/product-export.module';

export const CATALOGS_ROUTER: Routes = [
  {
    path: '', component: CatalogsComponent, data: { breadcrumb: 'Catálogos' },
    children: [
      {
        path: 'suppliers',
        loadChildren: () => import('./pages/suppliers/suppliers.module').then(m => m.SuppliersModule),
        data: { breadcrumb: 'Proveedores' }
      },
      {
        path: 'customers',
        loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule),
        data: { breadcrumb: 'Clientes' }
      },
      {
        path: 'accounts-banks',
        loadChildren: () => import('./pages/accounts-banks/accounts-banks.module').then(m => m.AccountsBanksModule),
        data: { breadcrumb: 'Cuentas Bancarias' }
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
        data: { breadcrumb: 'Productos' }
      },
      {
        path: 'exchange-rate',
        loadChildren: () => import('./pages/exchange-rate/exchange-rate.module').then(m => m.ExchangeRateModule),
        data: { breadcrumb: 'Tipo de Cambio' }
      },
      {
        path: 'authorizers',
        loadChildren: () => import('./pages/authorizers/authorizers.module').then(m => m.AuthorizersModule),
        data: { breadcrumb: 'Autorizadores' }
      },
      {
        path: 'articles',
        loadChildren: () => import('./pages/articles/articles.module').then(m => m.ArticlesModule),
        data: { breadcrumb: 'Artículos' }
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule),
        data: { breadcrumb: 'Categorías' }
      },
      {
        path: 'sub-categories',
        loadChildren: () => import('./pages/sub-categories/sub-categories.module').then(m => m.SubCategoriesModule),
        data: { breadcrumb: 'Sub Categorías' }
      },
      {
        path: 'projects',
        loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule),
        data: { breadcrumb: 'Proyectos' },
      },
      {
        path: 'products-export',
        loadChildren: () => import('./pages/product-export/product-export.module').then(m => m.ProductExportModule),
        data: { breadcrumb: 'Productos de Exportación' }
      }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
