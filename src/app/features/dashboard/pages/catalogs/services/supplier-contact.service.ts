import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SupplierContact } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SupplierContactService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}supplierContact`;
  }

  getSupplierContactsBySupplierId(supplierId): Observable<SupplierContact[]> {
    return this.http.get<SupplierContact[]>(`${this.endpoint}/getSupplierContactsBySupplierId?supplierId=${supplierId}`);
  }

}
