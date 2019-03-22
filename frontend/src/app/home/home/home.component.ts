import {Component, OnInit} from '@angular/core';
import {UserSelectorService} from '../../state/selectors/user-selector.service';
import {select, Store} from '@ngrx/store';
import {UserDataState} from '../../state/user-data.state';
import {LoadUserData} from '../../state/user.actions';
import * as _ from 'lodash';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Logout} from '../../auth/state/auth.actions';
import {UserService} from '../../auth/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  msg: string;

  constructor(private router: Router, public usrSvc: UserService,
              private svc: UserSelectorService, private store: Store<UserDataState>) {
    this.store.dispatch(new LoadUserData());
    this.store.pipe(select(this.svc.getUserData()))
      .subscribe(m => this.msg = _.get(m, 'data'),
        (e: HttpErrorResponse) => {
          if (e.status === 401) {
            router.navigateByUrl('/login', {
              queryParams: {
                error: 'Unauthorized Access!'
              }
            });
          }
          console.error(`Error getting name: ${JSON.stringify(e)}`);
          this.msg = null;
        });
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new Logout());
    return false;
  }
}
