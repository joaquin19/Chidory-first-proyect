import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsFormComponent } from './projects-form/projects-form.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ProjectsDetailComponent } from './projects-detail/projects-detail.component';
import { RouterModule } from '@angular/router';
import { PROJECTS_ROUTER } from './projects.router';



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsListComponent,
    ProjectsFormComponent,
    ProjectsDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PROJECTS_ROUTER),
  ]
})
export class ProjectsModule { }
