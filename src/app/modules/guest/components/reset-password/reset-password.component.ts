import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from "../../../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatStepper} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public step1: boolean;
  public step2: boolean;
  public step3: boolean;
  public next: boolean;
  public email: string;
  public token: string;
  public password: string;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.next = false;
  }

  ngOnInit() {
  }

  public sendResetRequest(form: FormControl, stepper: MatStepper) {
    if (form.valid) {
      this.authService.checkEmailIsValid(this.email)
        .then((res: any) => {
          this.step1 = true;
          this.next = true;
          this.toastr.success(`The reset token has been sent to your email`);
        })
        .catch((err: HttpErrorResponse) => {
          if (err.status === 406) {
            this.toastr.error(`${err.error.message}`);
          } else {
            this.toastr.warning(`You are currently offline`);
          }
        });
    }
  }

  public setToken(form: FormControl) {
    if (form.valid) {
      this.step2 = true;
      this.next = true;
    }
  }

  public updatePassword(form: FormControl) {
    if (form.valid) {
      this.authService.resetPassword(this.token, this.password)
        .then((res: any) => {
          this.step3 = true;
          this.toastr.success('Password successfully updated');
          this.router.navigate(['/login']);
        })
        .catch((err: HttpErrorResponse) => {
          if (err.status === 406) {
            this.toastr.error(`${err.error.message}`);
          } else {
            this.toastr.warning(`Your are Currently offline`);
          }
        })

    }
  }


}
