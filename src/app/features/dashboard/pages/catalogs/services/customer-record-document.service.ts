import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { CustomerRecordDocument } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerRecordDocumentService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}customerRecordDocument`;
  }

  getCustomerRecordDocumentsByRecordId(recordId): Observable<CustomerRecordDocument[]> {
    return this.http.get<CustomerRecordDocument[]>(`${this.endpoint}/GetCustomerRecordDocumentsByRecordId?recordId=${recordId}`);
  }

}
