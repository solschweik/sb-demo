import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import * as _ from 'lodash';
import {AppUserInfo} from './app.user.info';

export enum AuthResourceType {
  APPLICATION, PAGE, DROP_DOWN, BUTTON, LINK, MENU, MENU_ITEM, COMPONENT
}

export interface AuthResource {
  type?: AuthResourceType;
  name?: string;
  uri?: string[];
  userRoles: string[];
}

export interface AuthConfig {
  applicationId: string;
  permissions: AuthResource[];
}

const ANY_APPLICATION = '*';
const ANY_ROLE = '*';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private config: AuthConfig[] = [
    {
      applicationId: ANY_APPLICATION,
      permissions: [{
        uri: ['/home', '/login'],
        userRoles: [ANY_ROLE]
      }]
    }, {
    applicationId: 'eap1',
      permissions: [{
        uri: ['/eap1/admin'],
        userRoles: ['ROLE_EAP1_ADMIN']
      }, {
        uri: ['/eap1/user', '/eap1'],
        userRoles: ['ROLE_EAP1_ADMIN', 'ROLE_EAP1_USER']
      }]
    }
  ];

  constructor(private usrSvc: UserService) {
  }

  async isUriAllowedA(uri: string): Promise<boolean> {
    const cusr: AppUserInfo = await this.usrSvc.currentUserA;
    const res = this.isUriAllowed(uri);
    console.log(`isUriAllowed: ${uri}: ${res} for user: ${cusr}`);
    return res;
  }

  isUriAllowed(uri: string): boolean {
    if (!this.usrSvc.currentUser) {
      return false;
    }
    const userRoles: string[] = this.usrSvc.currentUser.roles;
    const findApplicationConfig = _.memoize((currentUri: string) => {
      const appId = currentUri.startsWith('/') ? currentUri.split('/')[1] : currentUri.split('/')[0];
      const app = this.config.find(v => v.applicationId === appId);
      return app || this.config.find(v => v.applicationId === ANY_APPLICATION);
    });
    const findPermissions = _.memoize((roles: string[], currentUri: string) => {
      const app = findApplicationConfig(currentUri);
      return app.permissions.filter(p => {
        if (p.userRoles.length === 1 && p.userRoles[0] === ANY_ROLE) {
          return true;
        }
        return _.intersection(roles, p.userRoles).length;
      });
    });
    const foundPermissions: AuthResource[] = findPermissions(userRoles, uri);
    const uris: string[] =
      _.reduce(foundPermissions, (acc, v) => acc.concat(v.uri), [])
        .filter(u => u === uri);
    const res = !!(uris && uris.length);
    console.log(`irUriAllowed: ${uri}: ${res}`);
    return res;
  }
}
