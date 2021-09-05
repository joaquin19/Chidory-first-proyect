import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CATALOGS_ROUTER } from './catalogs.router';
import { CatalogsComponent } from './catalogs.component';


@NgModule({
  declarations: [
    CatalogsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CATALOGS_ROUTER),
  ]
})
export class CatalogsModule { }
