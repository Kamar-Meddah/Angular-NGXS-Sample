export class SetLoggedInfo {
  static readonly type = '[loggedInfo] set';

  public constructor(public payload: string) {
  }
}

export class Disconnect {
  static readonly type = 'disconnect';
}

