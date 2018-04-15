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
import {ObserveOnSubscriber} from 'rxjs/operators/observeOn';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private username: string;
  private password: string;
  @Select(LoggedInfoState.getIsLogged) isLogged$: Observable<boolean>;
  private subscription: any;


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
        .then((res: { token: string, message: string }) => {
          if (res.token === null) {
            this.toastr.error(`${res.message}`);
          } else {
            this.toastr.success(`${res.message}`);
            this.store.dispatch(new SetLoggedInfo(res.token));
            this.router.navigate(['']);
          }
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err.message);
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
