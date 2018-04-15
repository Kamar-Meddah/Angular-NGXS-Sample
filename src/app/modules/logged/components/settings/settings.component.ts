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

  private oldPassword: string;
  private newPassword: string;
  private email: string;

  constructor(private userService: UserService, private toast: ToastrService, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Settings');
  }

  public updatePassword(form: FormControl): void {
    if (form.valid && this.newPassword !== this.oldPassword) {
      this.userService.update(this.newPassword, this.oldPassword)
        .then((res: { message: string, updated: string }) => {
          if (res.updated === 'true') {
            this.toast.success(`${res.message}`);
            this.oldPassword = '';
            this.newPassword = '';
          } else {
            this.toast.error(`${res.message}`);
            this.oldPassword = '';

          }
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err.message);
        });
    }
  }

  public updateEmail(form: FormControl): void {
    if (form.valid) {
      this.userService.update(null, null, this.email)
        .then((res: { message: string, updated: string }) => {
          if (res.updated === 'true') {
            this.toast.success(`${res.message}`);
            this.email = '';
          } else {
            this.toast.error(`${res.message}`);
          }
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err.message);
        });
    }
  }

}
