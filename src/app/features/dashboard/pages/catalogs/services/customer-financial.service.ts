import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { CustomerFinancial } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerFinancialService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}customerFinancial`;
  }

  getCustomerFinancialsByCustomerId(customerId): Observable<CustomerFinancial> {
    return this.http.get<CustomerFinancial>(`${this.endpoint}/getCustomerFinancialsByCustomerId?customerId=${customerId}`);
  }

}
