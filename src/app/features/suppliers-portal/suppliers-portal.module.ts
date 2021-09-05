import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Router
import { SUPPLIERS_PORTAL_ROUTER } from './suppliers-portal.router';

// Modules
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../../shared/shared.module';

// Components
import { SuppliersPortalComponent } from './suppliers-portal.component';

@NgModule({
  declarations: [
    SuppliersPortalComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    SharedModule,
    RouterModule.forChild(SUPPLIERS_PORTAL_ROUTER)
  ]
})
export class SuppliersPortalModule { }
