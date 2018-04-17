import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {LoggedInfoState} from '../../store/loggedInfo.state';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Disconnect} from '../../store/loggedInfo.actions';
import {User} from '../../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Select(LoggedInfoState.getIsLogged) isLogged$: Observable<boolean>;
  @Select(LoggedInfoState.getUser) user$: Observable<User>;
  public opened: boolean;


  constructor(private router: Router, private authService: AuthService, private toast: ToastrService, private store: Store) {
    this.opened = false;
  }

  ngOnInit() {
  }

  public navigate(path: string): void {
    this.router.navigate([`${path}`]);
  }

  public logout(): void {
    this.authService.logout()
      .then(() => {
        this.store.dispatch(new Disconnect());
        this.toast.success('Successfully Disconnected');
        this.router.navigate(['/login']);
      })
      .catch((err: HttpErrorResponse) => {
        if (err.status === 406) {
          this.toast.error(`${err.error.message}`);
        } else {
          this.toast.warning(`You are currently offline`);
        }
      });
  }
}
