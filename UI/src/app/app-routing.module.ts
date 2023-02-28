import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookinghistoryComponent } from './components/bookinghistory/bookinghistory.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TheatreComponent } from './components/theatre/theatre.component';

export const routes: Routes = [
  { path: "home", component: LoginComponent },
  { path: `login`, component: LoginComponent },
  { path: `register`, component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'theatre/:movieId', component: TheatreComponent },
  { path: 'booking/history', component: BookinghistoryComponent },
  { path: ``, redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
