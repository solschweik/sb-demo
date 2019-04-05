import {AppUserInfo} from '../app.user.info';
import {CURRENT_USER_KEY} from '../../utils';
import {Action} from '@ngrx/store';
import {LOGIN_SUCCESS, LoginSuccess, LOGOUT_SUCCESS, LogoutSuccess} from './auth.actions';
import {JwtHelperService} from '@auth0/angular-jwt';

export class AuthState {
  public user: AppUserInfo;
  public errors: string[];
}

const initState: AuthState = {
  user: null,
  errors: null
};

export function authReducer(state = initState, action: Action) {
  switch ((action.type)) {
    case LOGIN_SUCCESS:
      return {
        user: createUser((action as LoginSuccess).jwt, (action as LoginSuccess).jwtSvc)
      };
    case LOGOUT_SUCCESS:
      return {... initState, errors: (action as LogoutSuccess).messages};
    default:
      return {... initState};
  }
}

export function createUser(jwtStr: string, svc: JwtHelperService): AppUserInfo {
  const tkn = svc.decodeToken(jwtStr);
  console.log(`createUser: ${jwtStr}, token: ${JSON.stringify(tkn)}`);
  const user = new AppUserInfo(tkn);
  sessionStorage.setItem(CURRENT_USER_KEY, jwtStr);
  return user;
}
