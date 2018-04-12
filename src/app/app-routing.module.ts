import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestRoutingModule} from './modules/guest/guest-routing.module';

const routes: Routes = [
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    GuestRoutingModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
