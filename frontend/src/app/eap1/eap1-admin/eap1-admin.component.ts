import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../common/BaseComponent';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';

@Component({
  selector: 'app-eap1-admin',
  templateUrl: './eap1-admin.component.html',
  styleUrls: ['./eap1-admin.component.scss']
})
export class Eap1AdminComponent extends BaseComponent implements OnInit {

  constructor(store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
  }

}
