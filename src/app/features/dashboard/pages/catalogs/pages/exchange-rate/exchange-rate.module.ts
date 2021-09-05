import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { EXCHANGERATE_ROUTER } from './exchange-rate.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRateListComponent } from './exchange-rate-list/exchange-rate-list.component';
import { ExchangeRateFormComponent } from './exchange-rate-form/exchange-rate-form.component';


@NgModule({
  declarations: [
    ExchangeRateComponent,
    ExchangeRateListComponent,
    ExchangeRateFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(EXCHANGERATE_ROUTER),
  ]
})
export class ExchangeRateModule { }
