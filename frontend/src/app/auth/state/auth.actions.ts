import {Action} from '@ngrx/store';

export const LOGIN_SUCCESS = '[Authentication] Login Success';
export const LOGIN = '[Authentication] Login';
export const LOGOUT = '[Authentication] Logout';
export const LOGOUT_SUCCESS = '[Authentication] Logout Success';
export const VALIDATE_TOKEN = '[Authentication] Validate Token';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public username: string, public pwd: string) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public jwt: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public messages?: string[]) {}
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor(public messages?: string[]) {}
}

export class ValidateToken implements Action {
  readonly type = VALIDATE_TOKEN;
}

export type Actions = Login | LoginSuccess | Logout | LogoutSuccess;
