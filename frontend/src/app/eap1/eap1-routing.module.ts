import {RouterModule, Routes} from '@angular/router';
import {Eap1ContainerComponent} from './eap1-container/eap1-container.component';
import {AuthGuard} from '../auth/auth.guard';
import {Eap1AdminComponent} from './eap1-admin/eap1-admin.component';
import {Eap1UserComponent} from './eap1-user/eap1-user.component';
import {NgModule} from '@angular/core';

const routes: Routes = [{
  path: '',
  component: Eap1ContainerComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '/', redirectTo: 'home' },
    { path: 'admin', component: Eap1AdminComponent, canActivate: [AuthGuard]},
    { path: 'user', component: Eap1UserComponent, canActivate: [AuthGuard]}
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Eap1RoutingModule {
}
