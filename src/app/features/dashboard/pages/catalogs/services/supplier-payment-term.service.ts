import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SupplierPaymentTerm } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SupplierPaymentTermService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}supplierPaymentTerm`;
  }

  getSupplierPaymentTerms(): Observable<SupplierPaymentTerm[]> {
    return this.http.get<SupplierPaymentTerm[]>(`${this.endpoint}/getSupplierPaymentTerms`);
  }

}
