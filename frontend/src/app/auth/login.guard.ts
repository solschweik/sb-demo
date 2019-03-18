import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {forwardRef, Inject} from '@angular/core';
import {UserService} from './user.service';

export class LoginGuard implements CanActivate {
  constructor(@Inject(forwardRef(() => UserService)) private usrSvc) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.usrSvc.currentUser;
  }
}
