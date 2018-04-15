import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../service/guard/auth.guard';
import {HomeComponent} from './components/home/home.component';
import {SettingsComponent} from './components/settings/settings.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'settings', component: SettingsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule {
}
