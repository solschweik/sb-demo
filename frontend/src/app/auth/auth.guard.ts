import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {forwardRef, Inject} from '@angular/core';
import {UserService} from './user.service';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => Router)) private router: Router,
    @Inject(forwardRef(() => UserService)) private usrSvc: UserService) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.usrSvc.currentUser) {
      return true;
    }
    this.router.navigateByUrl('/login');
  }

}
