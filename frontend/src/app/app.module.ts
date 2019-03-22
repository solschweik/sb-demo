import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EffectsModule} from '@ngrx/effects';
import {NavigationEffects} from './state/effects/navigation.effects';
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {StoreModule} from '@ngrx/store';
import {appStateReducers} from './state/app.state';
import {AuthEffects} from './auth/state/effects/auth.effects';
import {UserDataEffects} from './state/effects/user-data.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appStateReducers, {}),
    EffectsModule.forRoot([AuthEffects, NavigationEffects, UserDataEffects]),
    AuthModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
