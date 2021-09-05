import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductExportListComponent } from './product-export-list/product-export-list.component';
import { ProductExportFormComponent } from './product-export-form/product-export-form.component';
import { ProductExportComponent } from './product-export.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PRODUCTS_EXPORT_ROUTER } from './product-export.router';



@NgModule({
  declarations: [
    ProductExportComponent,
    ProductExportListComponent,
    ProductExportFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PRODUCTS_EXPORT_ROUTER)
  ]
})
export class ProductExportModule { }
