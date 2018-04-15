export interface User {
  username: string;
  password?: string;
  email: string;
  role?: string;
}

export class UserImpl implements User {

  private username: string;
  private email: string;
  private password: string;
  private role: string;

  public constructor(username: string = null, password: string = null, email: string = null, role: string = null) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
  }
}
