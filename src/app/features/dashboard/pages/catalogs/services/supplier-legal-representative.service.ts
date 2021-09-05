import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SupplierLegalRepresentative } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SupplierLegalRepresentativeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}supplierLegalRepresentative`;
  }

  getSupplierLegalRepresentativeBySupplierId(supplierId): Observable<SupplierLegalRepresentative> {
    return this.http.get<SupplierLegalRepresentative>(`${this.endpoint}/getSupplierLegalRepresentativeBySupplierId?supplierId=${supplierId}`);
  }

}
