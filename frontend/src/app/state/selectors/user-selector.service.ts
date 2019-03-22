import {Injectable} from '@angular/core';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserDataState} from '../user-data.state';

@Injectable()
export class UserSelectorService {

  // noinspection JSMethodCanBeStatic
  public getFeatureSelector() {
    return createFeatureSelector('user');
  }

  public getUserData() {
    return createSelector(this.getFeatureSelector(), (state: UserDataState) => {
      console.log(`getUserData(): ${JSON.stringify(state)}`);
      return state;
    });
  }
}
