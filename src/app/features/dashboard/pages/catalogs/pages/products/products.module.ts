import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { PRODUCTS_ROUTER } from './products.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsImportComponent } from './products-import/products-import.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsFormComponent,
    ProductsImportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PRODUCTS_ROUTER),
  ]
})
export class ProductsModule { }
