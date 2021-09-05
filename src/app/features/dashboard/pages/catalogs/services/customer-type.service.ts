import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { CustomerType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}customerType`;
  }

  getCustomerTypes(): Observable<CustomerType[]> {
    return this.http.get<CustomerType[]>(`${this.endpoint}/getCustomerTypes`);
  }

}
