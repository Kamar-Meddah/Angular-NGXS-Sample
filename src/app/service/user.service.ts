import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseConf} from '../config/base.conf';
import {UserImpl} from '../model/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  public create(username: string, password: string, email: string, role: string = null): Promise<object> {
    return this.http.post(
      `${BaseConf.ressourceUrl}user/`,
      new UserImpl(username, password, email, role)
    ).toPromise();
  }

}
