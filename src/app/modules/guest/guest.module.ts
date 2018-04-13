import {NgModule} from '@angular/core';
import {SharedModule} from '../shared.module';
import {LoginComponent} from './components/login/login.component';
import {GuestRoutingModule} from './guest-routing.module';

@NgModule({
  imports: [
    SharedModule,
    GuestRoutingModule,
  ],
  declarations: [
    LoginComponent,
  ]
})
export class GuestModule {
}
