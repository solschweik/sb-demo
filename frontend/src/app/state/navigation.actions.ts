import {Action} from '@ngrx/store';
import {NavigationExtras} from '@angular/router';

export const NAVIGATE_TO = '[Navigation] Navigate to';

export class NavigationPayload {
  constructor(public path: string[] | string, public extras?: NavigationExtras) {}
}

export class NavigateTo implements Action {
  readonly type = NAVIGATE_TO;
  constructor(public payload: NavigationPayload) {}
}

export type Actions = NavigateTo;
