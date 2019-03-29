import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {forwardRef, Inject} from '@angular/core';
import {UserService} from './user.service';
import {AuthService} from './auth.service';

export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    @Inject(forwardRef(() => Router)) private router: Router,
    @Inject(forwardRef(() => UserService)) private usrSvc: UserService,
    @Inject(forwardRef(() => AuthService)) private authSvc: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.isUriAllowedA(state.url).then(v => {
      if (!v) {
        this.router.navigateByUrl(this.usrSvc.currentUser ? '/home' : '/login');
      }
      return v;
    });
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

}
