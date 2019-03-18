import * as _ from 'lodash';

export class AppUserInfo {
  constructor(private jwt: string) {}

  get roles(): string[] {
    return _.get(this.jwt, 'payloadObj.auth', '').split(',');
  }

  get userId(): string {
    return _.get(this.jwt, 'payloadObj.sub');
  }

  get userName(): string {
    return _.get(this.jwt, 'payloadObj.name');
  }
}
