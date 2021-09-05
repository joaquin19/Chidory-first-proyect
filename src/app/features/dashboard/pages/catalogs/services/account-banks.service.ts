import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountBanksService {

  private endpoint: string;
  private endPointById: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `accountBank`;
    this.endPointById = `accountBankContact`;
  }

  getAccountBanks(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/getAccountBanks`);
  }

  getAccountBankById(accountBankId): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/getAccountBankById?accountBankId=${accountBankId}`);
  }

  getAccountBankBalanceById(accountBankId): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}}/getAccountBankBalanceById?accountBankId=${accountBankId}`);
  }

  saveAccountBank(accountBankSave): Observable<any> {
    return this.http.post<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/saveAccountBank`, accountBankSave);
  }

  updateAccountBank(accountBankSave): Observable<any> {
    return this.http.post<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/updateAccountBank`, accountBankSave);
  }

  updateAccountBankInactive(accountBankId, createBy): Observable<any> {
    return this.http.delete<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/updateAccountBankInactive?accountBankId=${accountBankId}&createBy=${createBy}`);
  }

  getAccountBankContactsByAccountBankId(accountBankId): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPointById}/getAccountBankContactsByAccountBankId?accountBankId=${accountBankId}`);
  }

}
