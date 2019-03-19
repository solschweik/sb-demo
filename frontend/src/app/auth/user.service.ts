import {Injectable} from '@angular/core';
import {AppUserInfo} from './app.user.info';
import {HttpClient} from '@angular/common/http';
import {CURRENT_USER_KEY} from '../utils';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {createUser} from './state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: AppUserInfo;

  constructor(private http: HttpClient) {
    const jwtStr = this.currentToken;
    if (jwtStr) {
      this.validateUser().subscribe(() => createUser(jwtStr), () => this.logout());
    }
  }

  // noinspection JSMethodCanBeStatic
  get currentToken() {
    return sessionStorage.getItem(CURRENT_USER_KEY);
  }

  get currentUser(): AppUserInfo {
    return this.user;
  }

  set currentUser(user: AppUserInfo) {
    this.user = user;
  }

  login(uname: string, pwd: string): Observable<string> {
    return this.http.post('http://localhost:8080/logmein',
      JSON.stringify({
        username: uname,
        password: pwd
      })).pipe(map(r => _.get<any, any>(r, 'jwt')));
  }

  logout() {
    this.user = null;
    sessionStorage.removeItem(CURRENT_USER_KEY);
  }

  validateUser(): Observable<any> {
    return this.http.get('http://localhost:8080/validate', {
      headers: {
        Authorization: `Bearer ${this.currentToken || ''}`
      }
    }).pipe(map(() => this.currentToken));
  }
}