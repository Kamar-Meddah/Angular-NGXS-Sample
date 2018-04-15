import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseConf} from '../config/base.conf';
import {UserImpl} from '../model/user';
import {Store} from '@ngxs/store';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private store: Store) {
  }

  public create(username: string, password: string, email: string, role: string = null): Promise<object> {
    return this.http.post(
      `${BaseConf.ressourceUrl}user/`,
      new UserImpl(username, password, email, role)
    ).toPromise();
  }

  public update(password: string = null, oldPassword: string = null, email: string = null): Promise<object> {
    return this.http.put(
      `${BaseConf.ressourceUrl}user/`,
      new UserImpl(null, password, email, null, oldPassword),
      {
        headers: new HttpHeaders().set('Authorization', `${this.getToken()}`)
      }
    ).toPromise();
  }

  private getToken(): string {
    return this.store.selectSnapshot((state => state.loggedInfo.token));
  }


}
