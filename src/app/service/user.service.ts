import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseConf} from '../config/base.conf';
import {UserImpl} from '../model/user';
import {Store} from '@ngxs/store';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private store: Store, private authService: AuthService) {
  }

  public create(username: string, password: string, email: string, role: string = null): Promise<object> {
    return this.http.post(
      `${BaseConf.ressourceUrl}user/`,
      new UserImpl(username, password, email, role)
    ).toPromise();
  }

  public update(password: string = null, oldPassword: string = null, email: string = null): Promise<object> {
    return this.http.put(
      `${BaseConf.ressourceUrl}user/${this.authService.getUser().id}/`,
      new UserImpl(null, password, email, null, oldPassword),
      {
        headers: new HttpHeaders().set('Authorization', `${this.authService.getToken()}`),
      }
    ).toPromise();
  }


}
