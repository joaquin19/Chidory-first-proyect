import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { CustomerContact } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerContactService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}customerContact`;
  }

  getCustomerContactsByCustomerId(customerId): Observable<CustomerContact[]> {
    return this.http.get<CustomerContact[]>(`${this.endpoint}/getCustomerContactsByCustomerId?customerId=${customerId}`);
  }

}
