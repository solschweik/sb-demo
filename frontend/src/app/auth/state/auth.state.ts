import {AppUserInfo} from '../app.user.info';
import * as _ from 'lodash';
import {CURRENT_USER_KEY} from '../../utils';
import {Action} from '@ngrx/store';
import {LOGIN_SUCCESS, LoginSuccess, LOGOUT_SUCCESS, LogoutSuccess} from './auth.actions';

declare const KJUR;

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
        user: createUser((action as LoginSuccess).jwt)
      };
    case LOGOUT_SUCCESS:
      return {... initState, errors: (action as LogoutSuccess).msg};
    default:
      return {... initState};
  }
}

export function createUser(jwtStr): AppUserInfo {
  const jwtObj = _.get(KJUR, 'jws.JWS.parse', () => null)(jwtStr);
  const user = new AppUserInfo(jwtObj);
  sessionStorage.setItem(CURRENT_USER_KEY, jwtStr);
  return user;
}
