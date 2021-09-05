import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { TokenGuard } from './guards/token-required.guard';

export const CORE_ROUTER: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'suppliers-portal',
    loadChildren: () => import('../features/suppliers-portal/suppliers-portal.module').then(m => m.SuppliersPortalModule)
  },
  {
    path: 'dashboard',
    canActivate: [TokenGuard],
    loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
