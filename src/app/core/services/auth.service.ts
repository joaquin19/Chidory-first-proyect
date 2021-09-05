import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { UserAuthenticationModel } from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}login`;
  }

  public auth(username: string, password: string): Observable<any> {
    return this.http.post(`${this.endpoint}/authenticate`, { username, password })
      .pipe(
        map((resp: any) => {
          const auth = new UserAuthenticationModel(resp);
          auth.saveCache();
          return auth;
        })
      );
  }

}
