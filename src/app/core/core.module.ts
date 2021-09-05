import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CORE_ROUTER } from './core.router';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot({ delay: 10 }),
    NgxUiLoaderRouterModule.forRoot({ showForeground: true }),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    ToastrModule.forRoot({
      closeButton: true,
      preventDuplicates: true,
      enableHtml: true,
      tapToDismiss: false
    }),
    RouterModule.forRoot(CORE_ROUTER, { relativeLinkResolution: 'legacy', useHash: true })
  ],
  exports: [
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    ToastrModule
  ]

})
export class CoreModule { }
