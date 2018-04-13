import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestModule} from "./modules/guest/guest.module";

const routes: Routes = [
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
