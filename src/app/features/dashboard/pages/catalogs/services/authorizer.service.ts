import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { Authorizer } from '../models/authorizer';

@Injectable({
  providedIn: 'root'
})
export class AuthorizerService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}authorizer`;
  }

  getAuthorizers(): Observable<any> {
    return this.http.get<Authorizer[]>(`${this.endpoint}/getAuthorizers`);
  }

  getAuthorizerById(authorizerId): Observable<any> {
    return this.http.get<Authorizer>(`${this.endpoint}/getAuthorizerById?authorizerId=${authorizerId}`);
  }

  saveAuthorizer(authorizerSave): Observable<any> {
    return this.http.post<Authorizer>(`${this.endpoint}/saveAuthorizer`, authorizerSave);
  }

  updateAuthorizer(authorizerSave): Observable<any> {
    return this.http.put<Authorizer>(`${this.endpoint}/updateAuthorizer`, authorizerSave);
  }

  deleteAuthorizer(authorizerId, deleteBy): Observable<any> {
    return this.http.delete<Authorizer>(`${this.endpoint}/deleteAuthorizer?authorizerId=${authorizerId}&deleteBy=${deleteBy}`);
  }

  getAuthorizerByProcessTypeId(processTypeId): Observable<any> {
    return this.http.get<Authorizer[]>(`${this.endpoint}/getAuthorizerByProcessTypeId?processTypeId=${processTypeId}`);
  }

  updateAuthorizerOrder(authorizerOrderSave): Observable<any> {
    return this.http.put<Authorizer[]>(`${this.endpoint}/updateAuthorizerOrder`, authorizerOrderSave);
  }

}
