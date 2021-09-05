import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SupplierRecordDocument } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SupplierRecordDocumentService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}supplierRecordDocument`;
  }

  getSupplierRecordDocumentsByRecordId(recordId): Observable<SupplierRecordDocument[]> {
    return this.http.get<SupplierRecordDocument[]>(`${this.endpoint}/getSupplierRecordDocumentsByRecordId?recordId=${recordId}`);
  }

}
