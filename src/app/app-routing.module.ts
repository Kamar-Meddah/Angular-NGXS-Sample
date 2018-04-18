import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestModule} from './modules/guest/guest.module';
import {AuthGuard} from './service/guard/auth.guard';
import {NotfoundComponent} from './components/notfound/notfound.component';

const routes: Routes = [

  {path: '', canLoad: [AuthGuard], loadChildren: './modules/logged/logged.module#LoggedModule'},
  {path: '**', component: NotfoundComponent}
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
