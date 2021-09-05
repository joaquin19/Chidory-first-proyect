import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Router
import { DASHBOARD_ROUTER } from './dashboard.router';

// Modules
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../../shared/shared.module';

// Components
import { DashboardComponent } from './dashboard.component';
import { SomeRouteComponent } from './pages/some-route/some-route.component';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SomeRouteComponent,
    HeaderComponent,
    NavMenuComponent,
    NotificationsComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    SharedModule,
    RouterModule.forChild(DASHBOARD_ROUTER)
  ]
})
export class DashboardModule { }
