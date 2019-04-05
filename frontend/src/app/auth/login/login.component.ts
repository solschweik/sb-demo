import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import {Login, Logout} from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public svc: UserService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  login(uname: string, pwd: string): boolean {
    this.store.dispatch(new Login(uname, pwd));
    return false;
  }

  logout(): boolean {
    this.store.dispatch(new Logout());
    return false;
  }
}
