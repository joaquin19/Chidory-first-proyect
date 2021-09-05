import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountPayableService {

  private endpoint: string;
  private endPointStatus: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}accountPayable`;
    this.endPointStatus = `${UrlApiUtil.getApiUrl()}accountPayableStatus`;
  }

  getAuthorizedPurchaseOrders(createBy, authorizationStatusId): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/getAuthorizedPurchaseOrders?&createBy=${createBy}&authorizationStatusId=${authorizationStatusId}`);
  }

  updateAccountPayable(accountPayableSave): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/updateAccountPayable`, accountPayableSave);
  }

  getAccountPayableStatus(): Observable<any> {
    return this.http.get<any[]>(`${this.endPointStatus}/getAccountPayableStatus`);
  }
}
