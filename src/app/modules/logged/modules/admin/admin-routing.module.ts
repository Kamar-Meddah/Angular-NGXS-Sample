import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './components/users/users.component';
import {AdministrationHomeComponent} from './components/administration-home/administration-home.component';
import {AdminGuard} from '../../../../service/guard/admin.guard';

const routes: Routes = [
  {
    path: '', canActivate: [AdminGuard],
    children: [
      {path: '', component: AdministrationHomeComponent},
      {path: 'users', component: UsersComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
