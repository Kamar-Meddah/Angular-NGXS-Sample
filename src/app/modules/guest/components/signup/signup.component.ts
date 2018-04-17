import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AuthService} from "../../../../service/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public username: string;
  public password: string;
  public confirmedPassword: string;
  public email: string;

  constructor(private authService: AuthService, private userService: UserService, private toastr: ToastrService, private router: Router, private titleService: Title) {
  }

  ngOnInit() {
    if (this.authService.checkIfLogged()) {
      this.router.navigate(['/']);
    } else {
      this.titleService.setTitle('Signin');
    }
  }

  public sign(form: FormControl): void {
    if (form.valid && this.confirmedPassword === this.password) {
      this.userService.create(this.username, this.password, this.email)
        .then(() => {
          this.toastr.success(`Request has been sent Successfully`);
          this.router.navigate(['login']);
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

}
