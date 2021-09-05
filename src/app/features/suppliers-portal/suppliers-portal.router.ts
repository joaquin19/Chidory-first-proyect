import { Routes } from '@angular/router';

import { SuppliersPortalComponent } from './suppliers-portal.component';

export const SUPPLIERS_PORTAL_ROUTER: Routes = [
    {
        path: '', component: SuppliersPortalComponent, data: { breadcrumb: 'Portal de Proveedores' },
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/purchase-orders-search/purchase-orders-search.module')
                    .then(m => m.PurchaseOrdersSearchModule)
            }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];