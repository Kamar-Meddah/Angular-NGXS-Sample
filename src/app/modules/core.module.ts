import {NgModule} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {UserService} from '../service/user.service';
import {AuthGuard} from '../service/guard/auth.guard';

@NgModule({
  providers: [
    AuthService,
    UserService,
    AuthGuard,
  ]
})
export class CoreModule {
}
