import {Action} from '@ngrx/store';
import {LOAD_USER_DATA_SUCCESS, LoadUserDataSuccess} from './user.actions';

export class UserDataState {
  data: any;
}

const initState: UserDataState = {
  data: null
};

export function userDataReducer(state = initState, action: Action) {
  switch (action.type) {
    case LOAD_USER_DATA_SUCCESS:
      return {
        data: (action as LoadUserDataSuccess).payload
      };
    default:
      return {... initState};
  }
}
