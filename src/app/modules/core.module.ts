import {NgModule} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {UserService} from '../service/user.service';

@NgModule({
  providers: [
    AuthService,
    UserService,
  ]
})
export class CoreModule {
}
