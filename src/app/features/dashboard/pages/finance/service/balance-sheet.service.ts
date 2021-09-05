import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceSheetService {

  private endpoint: string;

  constructor(
     private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}Accountings`;
  }

  getAccountings(balanceYear): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/GetAccountings?year=${balanceYear}`);
  }
}
