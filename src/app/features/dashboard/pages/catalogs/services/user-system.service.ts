import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { UserSystem } from '../models/user-system';

@Injectable({
  providedIn: 'root'
})
export class UserSystemService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}userSystem`;
  }

  getUsersSystem(): Observable<any> {
    return this.http.get<UserSystem[]>(`${this.endpoint}/getUsersSystem`);
  }

  saveUserSystem(userSystemSave): Observable<any> {
    return this.http.post<UserSystem>(`${this.endpoint}/saveUserSystem`, userSystemSave);
  }

  updateUserSystem(userSystemSave): Observable<any> {
    return this.http.put<UserSystem>(`${this.endpoint}/updateUserSystem`, userSystemSave);
  }

  updateResetPassword(userSystemSave): Observable<any> {
    return this.http.put<UserSystem>(`${this.endpoint}/updateResetPassword`, userSystemSave);
  }

  deleteUserSystem(userSystemId, deleteBy): Observable<any> {
    return this.http.delete<UserSystem>(`${this.endpoint}/deleteUserSystem?userSystemId=${userSystemId}&deleteBy=${deleteBy}`);
  }

  updateActiveUserSystem(userSystemActiveSave): Observable<any> {
    return this.http.put<UserSystem>(`${this.endpoint}/updateActiveUserSystem`, userSystemActiveSave);
  }

}
