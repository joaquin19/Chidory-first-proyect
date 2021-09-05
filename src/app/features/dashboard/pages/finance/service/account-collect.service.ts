import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { AccountPayable } from '../models/account-payable';

@Injectable({
  providedIn: 'root'
})
export class AccountCollectService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}accountPayable`;
  }

  getAuthorizedPurchaseOrders(createBy, authorizationStatusId) {
    return this.http.get<AccountPayable[]>(`${this.endpoint}/getAuthorizedPurchaseOrders?&createBy=${createBy}&authorizationStatusId=${authorizationStatusId}`);
  }

  updateAccountPayable(accountPayableSave) {
    return this.http.put<AccountPayable>(`${this.endpoint}/updateAccountPayable`, accountPayableSave);
  }
}
