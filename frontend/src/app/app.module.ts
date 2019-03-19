import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/state/effects/auth.effects';
import {NavigationEffects} from './state/effects/navigation.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot([NavigationEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
