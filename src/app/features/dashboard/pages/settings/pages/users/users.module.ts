import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { USERS_ROUTER } from './users.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersFormComponent } from './users-form/users-form.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(USERS_ROUTER),
  ]
})
export class UsersModule { }
