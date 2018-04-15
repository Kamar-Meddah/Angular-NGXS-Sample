import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestModule} from './modules/guest/guest.module';
import {AuthGuard} from './service/guard/auth.guard';

const routes: Routes = [

  {
    path: '', canLoad: [AuthGuard], loadChildren: './modules/logged/logged.module#LoggedModule'
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    GuestModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
