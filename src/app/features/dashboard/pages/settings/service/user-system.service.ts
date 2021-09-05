import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { UserSystem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserSystemService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `userSystem`;
  }

  getUsersSystem(): Observable<UserSystem[]> {
    return this.http.get<UserSystem[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/getUsersSystem`);
  }

  saveUserSystem(userSystemSave): Observable<UserSystem> {
    return this.http.post<UserSystem>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/saveUserSystem`, userSystemSave);
  }

  updateUserSystem(userSystemSave): Observable<UserSystem> {
    return this.http.put<UserSystem>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/updateUserSystem`, userSystemSave);
  }

  updateResetPassword(userSystemSave): Observable<UserSystem> {
    return this.http.put<UserSystem>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/updateResetPassword`, userSystemSave);
  }

  deleteUserSystem(userSystemId, deleteBy): Observable<UserSystem> {
    return this.http.delete<UserSystem>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/deleteUserSystem?userSystemId=${userSystemId}&deleteBy=${deleteBy}`);
  }

  updateActiveUserSystem(userSystemActiveSave): Observable<UserSystem> {
    return this.http.put<UserSystem>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/updateActiveUserSystem`, userSystemActiveSave);
  }
}
