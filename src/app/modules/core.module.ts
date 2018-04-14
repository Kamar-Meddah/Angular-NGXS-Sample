import {NgModule} from '@angular/core';
import {AuthService} from '../service/auth.service';

@NgModule({
  providers: [
    AuthService,
  ]
})
export class CoreModule {
}
