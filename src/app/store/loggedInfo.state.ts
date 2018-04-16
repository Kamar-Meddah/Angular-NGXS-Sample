import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Disconnect, SetLoggedInfo} from './loggedInfo.actions';
import * as jwt_decode from 'jwt-decode';
import JWT from '../model/jwt';

export interface LoggedInfo {
  token: string | null;
  role: string | null;
  isLogged: boolean;
  user: string;
}

@State<LoggedInfo>({
  name: 'loggedInfo',
  defaults: {
    token: null,
    role: null,
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
  public static getRole(state: LoggedInfo): string {
    return state.role;
  }

  @Selector()
  public static getUser(state: LoggedInfo): string {
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
      role: jwt.aud === 'null' ? null : jwt.aud,
      isLogged: jwt != null,
      user: jwt.iss,
    })
    ;
  }

  @Action(Disconnect)
  public disconnect({getState, setState}: StateContext<LoggedInfo>): void {
    localStorage.clear();
    setState({token: null, role: null, isLogged: false, user: null});
  }

}
