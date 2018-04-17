export interface User {
  username: string;
  password?: string;
  email?: string;
  role?: string;
  id?: string;
}

export class UserImpl implements User {

  public username: string;
  public email: string;
  public password: string;
  public oldPassword: string;
  public role: string;

  public constructor(username: string = null, password: string = null, email: string = null, role: string = null, oldPassword: string = null) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.oldPassword = oldPassword;
  }
}
