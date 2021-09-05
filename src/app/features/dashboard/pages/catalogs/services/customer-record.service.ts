import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { CustomerRecord } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerRecordService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}customerRecord`;
  }

  getCustomerRecordByCustomerId(customerId): Observable<CustomerRecord> {
    return this.http.get<CustomerRecord>(`${this.endpoint}/getCustomerRecordByCustomerId?customerId=${customerId}`);
  }

}
