import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {UserService} from './user.service';
import {AuthGuard} from './auth.guard';
import {LoginGuard} from './login.guard';
import {AuthService} from './auth.service';
import {JwtModule} from '@auth0/angular-jwt';
import {CURRENT_USER_KEY} from '../utils';

export function getToken(): string {
  return sessionStorage.getItem(CURRENT_USER_KEY);
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([]),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    })
  ],
  providers: [
    UserService, AuthGuard, LoginGuard, AuthService
  ]
})
export class AuthModule { }
