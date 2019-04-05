import * as _ from 'lodash';

export class AppUserInfo {
  constructor(private jwt: string) {}

  get roles(): string[] {
    return _.get(this.jwt, 'auth', '').split(',');
  }

  get userId(): string {
    return _.get(this.jwt, 'sub');
  }

  get userName(): string {
    return _.get(this.jwt, 'name');
  }

  get displayName(): string {
    return _.get(this.jwt, 'displayName');
  }
}
