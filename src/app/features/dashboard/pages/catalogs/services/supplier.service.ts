import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Supplier } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}supplier`;
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.endpoint}/getSuppliers`);
  }

  getSupplierById(supplierId): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.endpoint}/getSupplierById?supplierId=${supplierId}`);
  }

  saveSupplier(form: FormData): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.endpoint}/saveSupplier`, form);
  }

  updateSupplier(form: FormData): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.endpoint}/updateSupplier`, form);
  }

}
