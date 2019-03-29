import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Eap1AdminComponent } from './eap1-admin/eap1-admin.component';
import { Eap1ContainerComponent } from './eap1-container/eap1-container.component';
import { Eap1UserComponent } from './eap1-user/eap1-user.component';
import {RouterModule} from '@angular/router';
import {Eap1RoutingModule} from './eap1-routing.module';

@NgModule({
  declarations: [Eap1AdminComponent, Eap1ContainerComponent, Eap1UserComponent],
  imports: [
    CommonModule,
    RouterModule,
    Eap1RoutingModule
  ]
})
export class Eap1Module { }
