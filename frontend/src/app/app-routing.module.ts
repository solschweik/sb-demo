import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {LoginGuard} from './auth/login.guard';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './home/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {
    path: 'eap1',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: './eap1/eap1.module#Eap1Module'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
