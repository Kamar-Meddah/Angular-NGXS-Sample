import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseConf} from '../config/base.conf';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public authenticate(username: string, password: string): Promise<object> {
    return this.http.post(
      `${BaseConf.ressourceUrl}auth/`,
      {username: username, password: password},
    ).toPromise();
  }

}
