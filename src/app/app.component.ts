import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {AuthService} from "./service/auth.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {SetLoggedInfo} from "./store/loggedInfo.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store, private authService: AuthService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.checkToken(token)
        .then((res: HttpResponse<{valid: boolean}>) => {
          if (res.valid) {
            this.store.dispatch(new SetLoggedInfo(token));
          } else {
            localStorage.clear();
          }
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err.message);
        });
    }
  }

}
