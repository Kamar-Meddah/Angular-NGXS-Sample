import {LoggedInfo} from '../model/loggedInfo';

export class SetLoggedInfo {
  static readonly type = '[loggedInfo] set';

  public constructor(public payload: LoggedInfo) {
  }
}

export class Disconnect {
  static readonly type = 'disconnect';
}

