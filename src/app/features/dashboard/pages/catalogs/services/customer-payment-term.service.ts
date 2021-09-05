import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { CustomerPaymentTerm } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerPaymentTermService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}customerPaymentTerm`;
  }

  getCustomerPaymentTerms(): Observable<CustomerPaymentTerm[]> {
    return this.http.get<CustomerPaymentTerm[]>(`${this.endpoint}/getCustomerPaymentTerms`);
  }

}
