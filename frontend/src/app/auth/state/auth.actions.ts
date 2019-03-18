import {Action} from '@ngrx/store';

export const LOGIN_SUCCESS = '[Authentication] Login Success';
export const LOGOUT_SUCCESS = '[Authentication] Logout Success';

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public jwt: string) {}
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor(public msg?: string) {}
}

