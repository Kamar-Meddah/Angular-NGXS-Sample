import {NgModule} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {UserService} from '../service/user.service';
import {AuthGuard} from '../service/guard/auth.guard';
import {AdminGuard} from '../service/guard/admin.guard';

@NgModule({
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    AdminGuard,
  ]
})
export class CoreModule {
}
