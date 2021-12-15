import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { TablePaymentComponent } from './components/table-payment/table-payment.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'signin', pathMatch: 'full'
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'signup', component:SignupComponent
  },
  {
    path: 'home', component: TablePaymentComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
