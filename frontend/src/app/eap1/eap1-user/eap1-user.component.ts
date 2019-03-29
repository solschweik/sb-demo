import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../common/BaseComponent';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';

@Component({
  selector: 'app-eap1-user',
  templateUrl: './eap1-user.component.html',
  styleUrls: ['./eap1-user.component.scss']
})
export class Eap1UserComponent extends BaseComponent implements OnInit {

  constructor(store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
  }

}
