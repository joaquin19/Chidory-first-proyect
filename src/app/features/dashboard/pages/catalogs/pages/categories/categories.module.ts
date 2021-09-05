import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { CATEGORIES_ROUTER } from './categories.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { CategoriesComponent } from './categories.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesListComponent,
    CategoriesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CATEGORIES_ROUTER),
  ]
})
export class CategoriesModule { }
