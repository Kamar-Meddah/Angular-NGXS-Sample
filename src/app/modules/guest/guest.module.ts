import {NgModule} from '@angular/core';
import {SharedModule} from '../shared.module';
import {LoginComponent} from './components/login/login.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginComponent,
  ]
})
export class GuestModule {
}
