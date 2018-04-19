import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { AdministrationHomeComponent } from './components/administration-home/administration-home.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [UsersComponent, AdministrationHomeComponent]
})
export class AdminModule {
}
