import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RemissionComponent } from './remission.component';
import { RemissionListComponent } from './remission-list/remission-list.component';
import { RemissionFormComponent } from './remission-form/remission-form.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { RemissionDetailComponent } from './remission-detail/remission-detail.component';
import { REMISSION_ROUTER } from './remission.router';



@NgModule({
  declarations: [
    RemissionComponent,
    RemissionListComponent,
    RemissionFormComponent,
    RemissionDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(REMISSION_ROUTER),
  ]
})
export class RemissionModule { }
