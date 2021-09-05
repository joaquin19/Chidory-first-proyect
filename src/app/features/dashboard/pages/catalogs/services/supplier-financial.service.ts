import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SupplierFinancial } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SupplierFinancialService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}supplierFinancial`;
  }

  getSupplierFinancialsBySupplierId(supplierId): Observable<SupplierFinancial> {
    return this.http.get<SupplierFinancial>(`${this.endpoint}/getSupplierFinancialsBySupplierId?supplierId=${supplierId}`);
  }

}
