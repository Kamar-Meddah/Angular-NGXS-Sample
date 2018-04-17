import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Disconnect, SetLoggedInfo} from './loggedInfo.actions';
import * as jwt_decode from 'jwt-decode';
import JWT from '../model/jwt';
import {User} from '../model/user';

export interface LoggedInfo {
  token: string | null;
  isLogged: boolean;
  user: User | null;
}

@State<LoggedInfo>({
  name: 'loggedInfo',
  defaults: {
    token: null,
    isLogged: localStorage.getItem('token') !== null,
    user: null,
  }
})

export class LoggedInfoState {

  @Selector()
  public static getToken(state: LoggedInfo): string {
    return state.token;
  }

  @Selector()
  public static getUser(state: LoggedInfo): User {
    return state.user;
  }

  @Selector()
  public static getIsLogged(state: LoggedInfo): boolean {
    return state.isLogged;
  }

  @Action(SetLoggedInfo)
  public setLoggedInfo({getState, setState}: StateContext<LoggedInfo>, {payload}: SetLoggedInfo): void {
    const jwt: JWT = jwt_decode(payload);
    localStorage.setItem('token', payload);
    setState({
      token: payload,
      isLogged: jwt != null,
      user: {
        id: jwt.sub,
        role: jwt.aud === 'null' ? null : jwt.aud,
        username: jwt.iss
      },
    })
    ;
  }

  @Action(Disconnect)
  public disconnect({getState, setState}: StateContext<LoggedInfo>): void {
    localStorage.clear();
    setState({token: null, isLogged: false, user: null});
  }

}
