import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SupplierType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SupplierTypeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}supplierType`;
  }

  getSupplierTypes(): Observable<SupplierType[]> {
    return this.http.get<SupplierType[]>(`${this.endpoint}/getSupplierTypes`);
  }

}
