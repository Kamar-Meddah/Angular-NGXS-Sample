import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthService} from './service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Disconnect, SetLoggedInfo} from './store/loggedInfo.actions';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private date: number;

  constructor(private store: Store, private authService: AuthService, private router: Router) {
    this.date = new Date().getFullYear();
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.checkToken(token)
        .then((res: { valid: boolean }) => {
          if (res.valid) {
            this.store.dispatch(new SetLoggedInfo(token));
          } else {
            this.store.dispatch(new Disconnect());
            this.router.navigate(['login']);
          }
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err.message);
        });
    }
  }

}
