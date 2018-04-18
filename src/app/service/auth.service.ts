import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
    return this.http.delete(
      `${BaseConf.ressourceUrl}auth/logout/`,
      {
        headers: new HttpHeaders().set('Authorization', `${this.getToken()}`),
        params: new HttpParams().set('id', this.getUser().id),
      }).toPromise();
  }

  public getToken(): string {
    return this.store.selectSnapshot((state => state.loggedInfo.token));
  }

  public getUser(): User {
    return this.store.selectSnapshot((state => state.loggedInfo.user));
  }

  public checkEmailIsValid(email: string): Promise<any> {
    return this.http.patch(
      `${BaseConf.ressourceUrl}auth/`,
      {email: email}
    ).toPromise();
  }

  public resetPassword(resetToken: string, password: string): Promise<any> {
    return this.http.put(
      `${BaseConf.ressourceUrl}auth/`,
      {resetToken: resetToken, password: password}
    ).toPromise();
  }

}
