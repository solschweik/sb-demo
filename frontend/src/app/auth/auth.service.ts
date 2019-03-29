import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import * as _ from 'lodash';

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
        uri: ['/eap1/user'],
        userRoles: ['ROLE_EAP1_ADMIN', 'ROLE_EAP1_USER']
      }]
    }
  ];

  constructor(private usrSvc: UserService) {
  }

  isUriAllowed(uri: string): boolean {
    if (!this.usrSvc.currentUser) {
      return false;
    }
    const userRoles: string[] = this.usrSvc.currentUser.roles;
    const findApplicationConfig = _.memoize((currentUri: string) => {
      const appId = uri.startsWith('/') ? uri.split('/')[1] : uri.split('/')[0];
      const app = this.config.find(v => v.applicationId === appId);
      return app || this.config.find(v => v.applicationId === ANY_APPLICATION);
    });
    const findPermissions = _.memoize((roles: string[]) => {
      const app = findApplicationConfig(uri);
      return app.permissions.filter(p => {
        if (p.userRoles.length === 1 && p.userRoles[1] === ANY_ROLE) {
          return true;
        }
        return _.intersection(userRoles, p.userRoles).length;
      });
    });
    const foundPermissions: AuthResource[] = findPermissions(userRoles);
    const uris: string[] =
      _.reduce(foundPermissions, (acc, v) => acc.concat(v.uri), [])
        .filter(u => u === uri);
    const res = !!(uris && uris.length);
    console.log(`irUriAllowed: ${uri}: ${res}`);
    return res;
  }
}
