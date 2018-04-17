import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public oldPassword: string;
  public newPassword: string;
  public email: string;

  constructor(private userService: UserService, private toast: ToastrService, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Settings');
  }

  public updatePassword(form: FormControl): void {
    if (form.valid && this.newPassword !== this.oldPassword) {
      this.userService.update(this.newPassword, this.oldPassword)
        .then((res: { message: string, updated: boolean }) => {
          this.toast.success(`Successfully updated`);
          this.oldPassword = '';
          this.newPassword = '';
        })
        .catch((err: HttpErrorResponse) => {
          if (err.status === 406) {
            this.toast.error(`${err.error.message}`);
            this.oldPassword = '';
          } else {
            this.toast.warning(`You are currently offline`);
          }
        });
    }
  }

  public updateEmail(form: FormControl): void {
    if (form.valid) {
      this.userService.update(null, null, this.email)
        .then((res: { message: string, updated: boolean }) => {
          this.toast.success(`Successfully updated`);
        })
        .catch((err: HttpErrorResponse) => {
          if (err.status === 406) {
            this.toast.error(`${err.error.message}`);
            this.email = '';
          } else {
            this.toast.warning(`You are currently offline`);
          }
        });
    }
  }

}
