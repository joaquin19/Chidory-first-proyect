import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router
import { ENTRIES_ROUTER } from './entries.router';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { EntriesComponent } from './entries.component';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { EntriesFormComponent } from './entries-form/entries-form.component';


@NgModule({
  declarations: [
    EntriesComponent,
    EntriesListComponent,
    EntriesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ENTRIES_ROUTER),
  ]
})
export class EntriesModule { }
