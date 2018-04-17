import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthService} from './service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Disconnect, SetLoggedInfo} from './store/loggedInfo.actions';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public date: number;

  constructor(private store: Store, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.date = new Date().getFullYear();
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.checkToken(token)
        .then(() => {
          this.store.dispatch(new SetLoggedInfo(token));
        })
        .catch((err: HttpErrorResponse) => {
          if (err.status === 406) {
            this.toastr.warning('Session Expired');
            this.store.dispatch(new Disconnect());
            this.router.navigate(['login']);
          } else {
            this.toastr.warning(`You are currently offline`);
          }
        });
    }
  }

}
