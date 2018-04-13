import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiModule} from './ui.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    UiModule,
  ],
})
export class SharedModule {
}
