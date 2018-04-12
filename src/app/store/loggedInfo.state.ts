import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Disconnect, SetLoggedInfo} from './loggedInfo.actions';
import {LoggedInfo} from '../model/loggedInfo';

@State<LoggedInfo>({
  name: 'loggedInfo',
  defaults: {
    token: null,
    role: null,
    isLogged: false
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
  public static getIsLogged(state: LoggedInfo): boolean {
    return state.isLogged;
  }

  @Action(SetLoggedInfo)
  public setLoggedInfo({getState, setState}: StateContext<LoggedInfo>, {payload}: SetLoggedInfo): void {
    localStorage.setItem('token', payload.token);
    setState(payload);
  }

  @Action(Disconnect)
  public disconnect({getState, setState}: StateContext<LoggedInfo>): void {
    localStorage.clear();
    setState({token: null, role: null, isLogged: false});
  }

}
