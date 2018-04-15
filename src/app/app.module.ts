import {BrowserModule} from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';

import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {LoggedInfoState} from './store/loggedInfo.state';
import {SharedModule} from './modules/shared.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {NavbarComponent} from './components/navbar/navbar.component';
import {CoreModule} from './modules/core.module';
import {ToastrModule} from 'ngx-toastr';

let devTools = [
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsLoggerPluginModule.forRoot(),
];

if (environment.production === true) {
  devTools = [];
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    NgxsModule.forRoot([
      LoggedInfoState
    ]),
    ...devTools,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: false,
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
