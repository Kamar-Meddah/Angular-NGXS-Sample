import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseConf} from '../config/base.conf';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public authenticate(username: string, password: string): Promise<object> {
    return this.http.put(
      `${BaseConf.ressourceUrl}auth/`,
      {username: username, password: password},
    ).toPromise();
  }

  public checkToken(token: string): Promise<object> {
    return this.http.get(
      `${BaseConf.ressourceUrl}auth/`,
      {
        headers: new HttpHeaders().set('Authorization', `${token}`)
      }
    ).toPromise();
  }

}
