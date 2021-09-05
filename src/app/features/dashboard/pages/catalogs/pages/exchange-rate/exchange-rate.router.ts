import { Routes } from '@angular/router';

import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRateListComponent } from './exchange-rate-list/exchange-rate-list.component';
import { ExchangeRateFormComponent } from './exchange-rate-form/exchange-rate-form.component';

export const EXCHANGERATE_ROUTER: Routes = [
  {
    path: '', component: ExchangeRateComponent,
    children: [
      { path: '', component: ExchangeRateListComponent },
      { path: 'addExchangeRate', component: ExchangeRateFormComponent },
      { path: 'editExchangeRate/:id', component: ExchangeRateFormComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
