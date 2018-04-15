import {NgModule} from '@angular/core';
import {SharedModule} from '../shared.module';
import {LoggedRoutingModule} from './logged-routing.module';
import {HomeComponent} from './components/home/home.component';

@NgModule({
  imports: [
    SharedModule,
    LoggedRoutingModule,
  ],
  declarations: [HomeComponent]
})
export class LoggedModule {
}
