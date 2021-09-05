import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { RequisitionDetailTax } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RequisitionDetailTaxService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}requisitionDetailTax`;
  }

  getRequisitionDetailTaxByRH(requisitionId): Observable<RequisitionDetailTax[]> {
    return this.http.get<RequisitionDetailTax[]>(`${this.endpoint}/getRequisitionDetailTaxByRH?requisitionId=${requisitionId}`);
  }

  getRequisitionDetailTaxByRD(requisitionDetailId): Observable<RequisitionDetailTax[]> {
    return this.http.get<RequisitionDetailTax[]>(`${this.endpoint}/getRequisitionDetailTaxByRD?requisitionDetailId=${requisitionDetailId}`);
  }


}
