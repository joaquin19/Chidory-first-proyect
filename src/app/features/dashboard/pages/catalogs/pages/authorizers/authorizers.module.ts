import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { AUTHORIZERS_ROUTER } from './authorizers.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { AuthorizersComponent } from './authorizers.component';
import { AuthorizersListComponent } from './authorizers-list/authorizers-list.component';
import { AuthorizersFormComponent } from './authorizers-form/authorizers-form.component';
import { AuthorizersOrderFormComponent } from './authorizers-order-form/authorizers-order-form.component';

@NgModule({
  declarations: [
    AuthorizersComponent,
    AuthorizersListComponent,
    AuthorizersFormComponent,
    AuthorizersOrderFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AUTHORIZERS_ROUTER),
  ]
})
export class AuthorizersModule { }
