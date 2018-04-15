export interface User {
  username: string;
  password?: string;
  email: string;
  role?: string;
}

export class UserImpl implements User {

  public username: string;
  public  email: string;
  public  password: string;
  public role: string;

  public constructor(username: string = null, password: string = null, email: string = null, role: string = null) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
  }
}
