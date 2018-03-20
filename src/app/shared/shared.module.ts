import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';




@NgModule({
    declarations: [
      NopagefoundComponent,
      HeaderComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      NopagefoundComponent
    ],
    exports: [
      NopagefoundComponent,
      HeaderComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      NopagefoundComponent
    ]
})

export class SharedModule {}