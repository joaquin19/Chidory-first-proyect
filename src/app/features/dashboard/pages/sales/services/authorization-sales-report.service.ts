import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { SaleSupportHeader } from '../models/sale-support-header';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationSalesReportService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}SaleSupportHeader`;
  }

  upSaleSupportSendAuthorization(saleSupportSave): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/UpdateSaleSupportSendAuthorization`, saleSupportSave);
  }
}
