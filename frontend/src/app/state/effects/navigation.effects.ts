import {forwardRef, Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {NAVIGATE_TO, NavigateTo} from '../navigation.actions';
import {tap} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class NavigationEffects {
  constructor(@Inject(forwardRef(() => Router)) private router: Router,
              @Inject(forwardRef(() => Actions)) private actions: Actions) {
  }

  @Effect({dispatch: false})
  navigateToEffect: Observable<Action> = this.actions.pipe(
    ofType(NAVIGATE_TO),
    tap((action: NavigateTo) => {
      const url: string = _.isArray(action.payload.path) ? action.payload.path.join('/') : action.payload.path;
      console.log(`Navigating to ${url}, routes: ${this.router.config}`);
      this.router.navigateByUrl(url, action.payload.extras);
    })
  );
}

