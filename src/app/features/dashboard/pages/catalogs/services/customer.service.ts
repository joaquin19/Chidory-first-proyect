import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Customer } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}customer`;
  }

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.endpoint}/getCustomers`);
  }

  getCustomerById(customerId): Observable<Customer> {
    return this.http.get<Customer>(`${this.endpoint}/getCustomerById?CustomerId=${customerId}`);
  }

  saveCustomer(form: FormData): Observable<Customer> {
    return this.http.post<Customer>(`${this.endpoint}/saveCustomer`, form);
  }

  updateCustomer(form: FormData): Observable<Customer> {
    return this.http.post<Customer>(`${this.endpoint}/updateCustomer`, form);
  }

}
