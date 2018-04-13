import {NgModule} from '@angular/core';
import {SharedModule} from '../shared.module';
import {LoginComponent} from './components/login/login.component';
import {GuestRoutingModule} from './guest-routing.module';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  imports: [
    SharedModule,
    GuestRoutingModule,
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
  ]
})
export class GuestModule {
}
