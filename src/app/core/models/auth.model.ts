import { LoginUser } from './login-user';

export class UserAuthenticationModel {
  private readonly _user: LoginUser;

  constructor(user: LoginUser) {
    this._user = user;
  }

  public get user(): LoginUser {
    return this._user;
  }

  public static loadCache(): UserAuthenticationModel {
    const json: any = JSON.parse(localStorage.getItem('auth')) || null;
    if (json) {
      return new UserAuthenticationModel(json.user);
    } else {
      return null;
    }
  }

  public static deleteCache(): void {
    localStorage.removeItem('auth');
  }

  public saveCache(): void {
    localStorage.setItem('auth', JSON.stringify({ user: this.user }));
  }

}
