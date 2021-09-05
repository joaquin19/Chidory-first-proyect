import { Routes } from '@angular/router';
import { MerchandiseReceptionDetailModalComponent } from './merchandise-reception-detail-modal/merchandise-reception-detail-modal.component';

import { MerchandiseReceptionFormComponent } from './merchandise-reception-form/merchandise-reception-form.component';
import { MerchandiseReceptionListComponent } from './merchandise-reception-list/merchandise-reception-list.component';
import { MerchandiseReceptionComponent } from './merchandise-reception.component';

export const MERCHANDISERECEPTION_ROUTER: Routes = [
  {
    path: '', component: MerchandiseReceptionComponent,
    children: [
      { path: '', component: MerchandiseReceptionListComponent },
      {
        path: 'detailMerchandiseReception/:id', component: MerchandiseReceptionDetailModalComponent,
        data: { breadcrumb: 'Detalle de Recepción de Mercancía' }
      },
      {
        path: 'editMerchandiseReception/:id', component: MerchandiseReceptionFormComponent,
        data: { breadcrumb: 'Recepción de Mercancía' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
