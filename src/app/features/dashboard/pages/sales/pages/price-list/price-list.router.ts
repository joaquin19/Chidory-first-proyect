import { Routes } from '@angular/router';
import { PriceListListComponent } from './price-list-list/price-list-list.component';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { PriceListComponent } from './price-list.component';


export const PRICE_LIST_ROUTER: Routes = [
  {
    path: '', component: PriceListComponent,
    children: [
      { path: '', component: PriceListListComponent },
      {
        path: 'addPriceList', component: PriceListFormComponent,
        data: { breadcrumb: 'Nueva Lista de Precios' }
      },
      {
        path: 'editPriceList/:id', component: PriceListFormComponent,
        data: { breadcrumb: 'Edición de Lista de Precios' }
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
