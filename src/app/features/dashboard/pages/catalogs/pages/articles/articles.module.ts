import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Router

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';

// Components
import { ArticlesComponent } from './articles.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { NewArticleComponent } from './modals/new-article/new-article.component';


@NgModule({
  declarations: [
    ArticlesComponent,
    ArticlesListComponent,
    NewArticleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
