import {Action} from '@ngrx/store';

export const LOAD_USER_DATA = '[User] Load Data';
export const LOAD_USER_DATA_SUCCESS = '[User] Load Data Success';
export const LOAD_USER_DATA_FAILURE = '[User] Load Data Failure';

export class LoadUserData implements Action {
  readonly type = LOAD_USER_DATA;

  constructor(public payload?: any) {
  }
}

export class LoadUserDataSuccess implements Action {
  readonly type = LOAD_USER_DATA_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class LoadUserDataFailure implements Action {
  readonly type = LOAD_USER_DATA_FAILURE;

  constructor(public payload?: any) {
  }
}
