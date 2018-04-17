import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../../../service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Select, Store} from '@ngxs/store';
import {SetLoggedInfo} from '../../../../store/loggedInfo.actions';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {LoggedInfoState} from '../../../../store/loggedInfo.state';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public username: string;
  public password: string;
  @Select(LoggedInfoState.getIsLogged) isLogged$: Observable<boolean>;
  public subscription: any;


  constructor(private titleService: Title, private authService: AuthService, private toastr: ToastrService, private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.isLogged$.subscribe((res) => {
        if (res) {
          this.router.navigate(['/']);
        } else {
          this.titleService.setTitle('Login');
        }
      },
      (err => console.log(err))
    );

  }

  public login(form: FormControl): void {
    if (form.valid) {
      this.authService.authenticate(this.username, this.password)
        .then((res: { token: string }) => {
          this.toastr.success(`Successfully Logged`);
          this.store.dispatch(new SetLoggedInfo(res.token));
          this.router.navigate(['']);
        })
        .catch((err: HttpErrorResponse) => {
          if (err.status === 406) {
            this.toastr.error(`${err.error.message}`);
          } else {
            this.toastr.error(`You are currently offline`);
          }
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
