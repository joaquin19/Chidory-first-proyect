import { Routes } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';

export const CATEGORIES_ROUTER: Routes = [
  {
    path: '', component: CategoriesComponent,
    children: [
      { path: '', component: CategoriesListComponent },
      { path: 'addCategory', component: CategoriesFormComponent },
      { path: 'editCategory/:id', component: CategoriesFormComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
