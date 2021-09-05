import { Routes } from '@angular/router';

import { SubCategoriesComponent } from './sub-categories.component';
import { SubCategoriesListComponent } from './sub-categories-list/sub-categories-list.component';
import { SubCategoriesFormComponent } from './sub-categories-form/sub-categories-form.component';

export const SUBCATEGORIES_ROUTER: Routes = [
  {
    path: '', component: SubCategoriesComponent,
    children: [
      { path: '', component: SubCategoriesListComponent },
      { path: 'addCategory', component: SubCategoriesFormComponent },
      { path: 'editCategory/:id', component: SubCategoriesFormComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
