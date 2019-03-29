import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../common/BaseComponent';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';

@Component({
  selector: 'app-eap1-container',
  templateUrl: './eap1-container.component.html',
  styleUrls: ['./eap1-container.component.scss']
})
export class Eap1ContainerComponent extends BaseComponent implements OnInit {

  constructor(store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
  }

}
