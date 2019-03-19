import {forwardRef, Inject, Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../user.service';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, concatMap, exhaustMap, switchMap} from 'rxjs/operators';
import {createUser} from '../auth.state';
import {Login, LOGIN, LoginSuccess, LOGOUT, Logout, LogoutSuccess, VALIDATE_TOKEN} from '../auth.actions';
import {NavigateTo} from '../../../state/navigation.actions';
import * as _ from 'lodash';

@Injectable()
export class AuthEffects {
  constructor(@Inject(forwardRef(() => Actions)) private actions: Actions,
              private svc: UserService) {
  }

  @Effect()
  validateTokenEffect: Observable<Action> = this.actions.pipe(
    ofType(VALIDATE_TOKEN),
    concatMap((jwtStr: string) => {
      this.svc.currentUser = createUser(jwtStr);
      return [
        new LoginSuccess(jwtStr),
        new NavigateTo({path: '/home'})
      ];
    }),
    catchError(err => {
      console.log(`Validate Token Error ${JSON.stringify(err)}`);
      return [new Logout(extractErrorMessages(err))];
    }));

  @Effect()
  loginEffect: Observable<Action> = this.actions.pipe(
    ofType(LOGIN),
    switchMap((action: Login) => this.svc.login(action.username, action.pwd).pipe(
      concatMap((jwtStr: string) => {
        this.svc.currentUser = createUser(jwtStr);
        return [new NavigateTo({path: '/home'})];
      }),
      catchError(err => {
        console.log(`Login Error ${JSON.stringify(err)}`);
        return [new Logout(extractErrorMessages(err))];
      }))
    ));

  @Effect()
  logoutEffect: Observable<Action> = this.actions.pipe(
    ofType(LOGOUT),
    exhaustMap((action: Logout) => {
      this.svc.logout();
      return [
        new LogoutSuccess(action.messages),
        new NavigateTo({path: '/login'})
      ];
    }));
}

function extractErrorMessages(e: any): string[] {
  const msg = _.get(e, 'message');
  return msg ? [msg] : null;
}
