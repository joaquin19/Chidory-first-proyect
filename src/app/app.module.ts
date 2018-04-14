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

// Servicios ò Provideers
import { ServiceModule } from './services/service.module';

// Ruta
import {APP_ROUTING} from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpModule,
    PagesModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
