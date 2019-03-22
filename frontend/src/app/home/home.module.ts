import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {UserSelectorService} from '../state/selectors/user-selector.service';
import {StoreModule} from '@ngrx/store';
import {userDataReducer} from '../state/user-data.state';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('user', userDataReducer)
  ],
  providers: [UserSelectorService]
})
export class HomeModule { }
