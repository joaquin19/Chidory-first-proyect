import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { CustomerLegalRepresentative } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerLegalRepresentativeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}customerLegalRepresentative`;
  }

  getCustomerLegalRepresentativeByCustomerId(customerId): Observable<CustomerLegalRepresentative> {
    return this.http.get<CustomerLegalRepresentative>(`${this.endpoint}/getCustomerLegalRepresentativeByCustomerId?customerId=${customerId}`);
  }

}
