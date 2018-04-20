import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  public getAllUsersP(page: string, query: string | null = null): Promise<any> {
    return this.http.get(
      `${BaseConf.ressourceUrl}user/`,
      {
        headers: new HttpHeaders().set('Authorization', `${this.authService.getToken()}`),
        params: new HttpParams()
          .set('page', page)
          .set('query', query === null ? '' : query),
      }
    ).toPromise();
  }

  public deleteUser(id: string): Promise<any> {
    return this.http.delete(
      `${BaseConf.ressourceUrl}user/${id}`,
      {
        headers: new HttpHeaders().set('Authorization', `${this.authService.getToken()}`),
      }
    ).toPromise();
  }

  public updateRoleAndConfirm(role: string, id: string): Promise<any> {
    return this.http.patch(
      `${BaseConf.ressourceUrl}user/${id}`,
      {role: role},
      {
        headers: new HttpHeaders().set('Authorization', `${this.authService.getToken()}`),
      }
    ).toPromise();
  }


}
