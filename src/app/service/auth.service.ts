import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseConf} from '../config/base.conf';
import {Store} from '@ngxs/store';
import {User} from "../model/user";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private store: Store) {
  }

  public authenticate(username: string, password: string): Promise<object> {
    return this.http.post(
      `${BaseConf.ressourceUrl}auth/`,
      {username: username, password: password},
    ).toPromise();
  }

  public checkToken(token: string): Promise<object> {
    return this.http.head(
      `${BaseConf.ressourceUrl}auth/`,
      {
        headers: new HttpHeaders().set('Authorization', `${token}`)
      }
    ).toPromise();
  }

  public checkIfLogged(): boolean {
    return this.store.selectSnapshot((state => state.loggedInfo.isLogged));
  }

  public logout(): Promise<any> {
    return this.http.patch(
      `${BaseConf.ressourceUrl}auth/${this.getUser().id}`,
      {},
      {
        headers: new HttpHeaders().set('Authorization', `${this.getToken()}`)
      }).toPromise();
  }

  public getToken(): string {
    return this.store.selectSnapshot((state => state.loggedInfo.token));
  }

  public getUser(): User {
    return this.store.selectSnapshot((state => state.loggedInfo.user));
  }

}
