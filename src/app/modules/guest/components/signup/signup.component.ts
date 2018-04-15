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

  private username: string;
  private password: string;
  private confirmedPassword: string;
  private email: string;

  constructor(private authService: AuthService, private userService: UserService, private tostr: ToastrService, private router: Router, private titleService: Title) {
  }

  ngOnInit() {
    if (this.authService.checkIfLogged()) {
      console.log("hello")
      this.router.navigate(['/']);
    } else {
      this.titleService.setTitle('Signin');
    }
  }

  public sign(form: FormControl): void {
    if (form.valid && this.confirmedPassword === this.password) {
      this.userService.create(this.username, this.password, this.email)
        .then((res: { created: string, message: string }) => {
          if (res.created === 'true') {
            this.tostr.success(`${res.message}`);
            this.router.navigate(['login']);
          } else {
            this.tostr.error(`${res.message}`);
          }
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err.message);
        });
    }
  }

}
