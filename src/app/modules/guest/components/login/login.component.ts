import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../../../service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {Store} from "@ngxs/store";
import {SetLoggedInfo} from "../../../../store/loggedInfo.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;


  constructor(private authService: AuthService, private toastr: ToastrService, private store: Store, private route: Router) {
  }

  ngOnInit() {
    if (this.authService.checkIfLogged()) {
      this.route.navigate(['']);
    }
  }

  public login(form: FormControl): void {
    if (form.valid) {
      this.authService.authenticate(this.username, this.password)
        .then((res: { token: string, message: string }) => {
          if (res.token === null) {
            this.toastr.error(`${res.message}`);
          } else {
            this.toastr.success(`${res.message}`);
            this.store.dispatch(new SetLoggedInfo(res.token));
          }
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err.message);
        });
    }
  }

}
