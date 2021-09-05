import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { AuthorizationProcess } from '../models/authorization-process';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationProcessService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}authorizationProcess`;
  }

  getAuthorizations(processTypeId, userName, authorizationStatusId = 0, valueId = 0): Observable<AuthorizationProcess[]> {
    return this.http.get<AuthorizationProcess[]>(`${this.endpoint}/getAuthorizations?processTypeId=${processTypeId}&userName=${userName}&authorizationStatusId=${authorizationStatusId}&valueId=${valueId}`);
  }

  getAuthorizationsByProcessTypeId(processTypeId, valueId): Observable<AuthorizationProcess[]> {
    return this.http.get<AuthorizationProcess[]>(`${this.endpoint}/getAuthorizationsByProcessTypeId?processTypeId=${processTypeId}&valueId=${valueId}`);
  }

  getObservations(processTypeId, userName, valueId): Observable<AuthorizationProcess[]> {
    return this.http.get<AuthorizationProcess[]>(`${this.endpoint}/getObservations?processTypeId=${processTypeId}&userName=${userName}&valueId=${valueId}`);
  }

  saveAuthorizationProcess(authorizationSave): Observable<AuthorizationProcess> {
    return this.http.post<AuthorizationProcess>(`${this.endpoint}/saveAuthorization`, authorizationSave);
  }

  updateAuthorizationProcess(authorizationSave): Observable<AuthorizationProcess[]> {
    return this.http.post<AuthorizationProcess[]>(`${this.endpoint}/updateAuthorization`, authorizationSave);
  }

  deleteAuthorization(authorizationProcessId, deleteBy): Observable<AuthorizationProcess> {
    return this.http.delete<AuthorizationProcess>(`${this.endpoint}/deleteAuthorization?authorizationProcessId=${authorizationProcessId}&deleteBy=${deleteBy}`);
  }

}
