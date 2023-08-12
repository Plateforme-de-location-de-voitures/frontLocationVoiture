import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesComponent } from './templates/templates.component';
import { AccueilComponent } from './accueil/accueil.component';
import { VoituresComponent } from './voitures/voitures.component';
import { GaleriesVoituresComponent } from './galeries-voitures/galeries-voitures.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path:'login', component: LoginComponent},
  { path:'register', component: RegisterComponent},

  { path:'', component: TemplatesComponent,
  children:[
    { path:'', component: AccueilComponent},
    { path:'voitures', component: VoituresComponent, canActivate: [AuthGuard]},
    { path:'galeries-voitures', component: GaleriesVoituresComponent, canActivate: [AuthGuard]},
    { path:'reservations', component: ReservationsComponent, canActivate: [AuthGuard]}
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
