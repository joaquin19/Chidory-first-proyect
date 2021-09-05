import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SupplierRecord } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SupplierRecordService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}supplierRecord`;
  }

  getSupplierRecordBySupplierId(supplierId): Observable<SupplierRecord> {
    return this.http.get<SupplierRecord>(`${this.endpoint}/getSupplierRecordBySupplierId?supplierId=${supplierId}`);
  }

}
