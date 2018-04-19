import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import {NgxCoolDialogsModule} from "ngx-cool-dialogs";

@NgModule({
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    NgxCoolDialogsModule.forRoot({
      theme: 'default', // available themes: 'default' | 'material' | 'dark'
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      titles: {
        alert: 'Danger!',
        confirm: 'Confirmation',
        prompt: 'Website asks...'
      }}),
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    NgxCoolDialogsModule,
  ]
})

export class UiModule {
}
