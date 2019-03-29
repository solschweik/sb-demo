import {forwardRef, Inject, Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../auth/user.service';
import {Observable} from 'rxjs';
import {LOAD_USER_DATA, LoadUserData, LoadUserDataSuccess, LoadUserDataFailure} from '../user.actions';
import {catchError, concatMap, switchMap} from 'rxjs/operators';
import {Logout} from '../../auth/state/auth.actions';
import {Action} from '@ngrx/store';

@Injectable()
export class UserDataEffects {
  constructor(@Inject(forwardRef(() => Actions)) private actions: Actions,
              @Inject(forwardRef(() => UserService)) private usrSvc: UserService) {
  }

  @Effect()
  loadUserData: Observable<any> = this.actions.pipe(
    ofType(LOAD_USER_DATA),
    switchMap((action: LoadUserData) => this.usrSvc.getUserData(action.payload).pipe(
      concatMap(d => [new LoadUserDataSuccess(d)]),
      catchError(err => {
        console.error(`Failed Loading User Data: ${JSON.stringify(err)}`);
        const res: Action[] = [];
        if (err.status === 401) {
          res.push(new Logout());
        } else {
          res.push(new LoadUserDataFailure());
        }
        return res;
      })
    ))
  );
}
