// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Bootstrap
import { AppComponent } from './app.component';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';

// Servicios ò Provideers
import { SharedService } from './services/shared.service';
import { SidebarService } from './services/sidebar.service';

// Ruta
import {APP_ROUTING} from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    // DashboardComponent,
    // ProgressComponent,
    // Graficas1Component,
    // HeaderComponent,
    // NopagefoundComponent,
    // SidebarComponent,
    // BreadcrumbsComponent,
    // PagesComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpModule,
    PagesModule
  ],
  providers: [SharedService, SidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
