import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SupplierDocumentType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SupplierDocumentTypeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}supplierDocumentType`;
  }

  getSupplierDocumentTypes(): Observable<SupplierDocumentType[]> {
    return this.http.get<SupplierDocumentType[]>(`${this.endpoint}/getSupplierDocumentTypes`);
  }

}
