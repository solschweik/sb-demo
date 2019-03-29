import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {NavigateTo} from '../state/navigation.actions';

export class BaseComponent {
  constructor(protected store: Store<AppState>) {
  }

  back() {
    this.store.dispatch(new NavigateTo({path: '/home'}));
    return false;
  }
}
