import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplatesComponent } from './templates/templates.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';
import { AccueilComponent } from './accueil/accueil.component';
import { VoituresComponent } from './voitures/voitures.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { GaleriesVoituresComponent } from './galeries-voitures/galeries-voitures.component';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TemplatesComponent,
    FooterComponent,
    HeaderComponent,
    AccueilComponent,
    VoituresComponent,
    ReservationsComponent,
    GaleriesVoituresComponent,
    MenuComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
