import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { SUBCATEGORIES_ROUTER } from './sub-categories.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { SubCategoriesComponent } from './sub-categories.component';
import { SubCategoriesListComponent } from './sub-categories-list/sub-categories-list.component';
import { SubCategoriesFormComponent } from './sub-categories-form/sub-categories-form.component';


@NgModule({
  declarations: [SubCategoriesComponent,
    SubCategoriesListComponent,
    SubCategoriesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(SUBCATEGORIES_ROUTER),
  ]
})
export class SubCategoriesModule { }
