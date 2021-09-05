import { Routes } from '@angular/router';

import { EntriesComponent } from './entries.component';
import { EntriesListComponent } from './entries-list/entries-list.component';

export const ENTRIES_ROUTER: Routes = [
  {
    path: '', component: EntriesComponent,
    children: [
      { path: '', component: EntriesListComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
