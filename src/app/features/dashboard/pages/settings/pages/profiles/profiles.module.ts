import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { PROFILES_ROUTER } from './profiles.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { ProfilesComponent } from './profiles.component';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { ProfilesFormComponent } from './profiles-form/profiles-form.component';

@NgModule({
  declarations: [
    ProfilesComponent,
    ProfilesListComponent,
    ProfilesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PROFILES_ROUTER),
  ]
})
export class ProfilesModule { }
