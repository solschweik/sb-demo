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
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthEffects {
  constructor(@Inject(forwardRef(() => Actions)) private actions: Actions,
              private svc: UserService,
              private jwtSvc: JwtHelperService) {
  }

  @Effect()
  validateTokenEffect: Observable<Action> = this.actions.pipe(
    ofType(VALIDATE_TOKEN),
    concatMap((jwtStr: string) => {
      this.svc.currentUser = createUser(jwtStr, this.jwtSvc);
      return [
        new LoginSuccess(jwtStr, this.jwtSvc),
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
    /* Turn on loading indicator
    .tap(payload => this.indSvc.loading = true)
     */
    switchMap((action: Login) => this.svc.login(action.username, action.pwd).pipe(
      /* In case user clicks button twice...
      .takeUntil(this.actions.pipe(ofType(CLICK_ACTION))
      // In case user navigates away from the page while request is running...
      .takeUntil(this.router.events)
      // Turn off loading indicator
      .tap(payload => this.indSvc.loading = false)
       */
      concatMap((jwtStr: string) => {
        this.svc.currentUser = createUser(jwtStr, this.jwtSvc);
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
