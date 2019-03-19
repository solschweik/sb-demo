import {authReducer, AuthState} from '../auth/state/auth.state';

export interface AppState {
  auth: AuthState;
}

export const appStateReducers = {
  auth: authReducer
};
