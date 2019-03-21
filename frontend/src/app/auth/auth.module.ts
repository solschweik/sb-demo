import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {UserService} from './user.service';
import {AuthGuard} from './auth.guard';
import {LoginGuard} from './login.guard';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './state/effects/auth.effects';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([]),
    // EffectsModule.forRoot([AuthEffects])
  ],
  providers: [
    UserService, AuthGuard, LoginGuard
  ]
})
export class AuthModule { }
