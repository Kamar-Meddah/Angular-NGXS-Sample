import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiModule} from './ui.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    HttpClientModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    UiModule,
    HttpClientModule,
  ],
})
export class SharedModule {
}
