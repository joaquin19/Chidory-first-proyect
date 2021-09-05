import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { RequisitionDetail } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RequisitionDetailService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}requisitionDetail`;
  }

  getRequisitionDetailByHeaderId(requisitionHeaderId): Observable<RequisitionDetail> {
    return this.http.get<RequisitionDetail>(`${this.endpoint}/getRequisitionDetailByHeaderId?requisitionHeaderId=${requisitionHeaderId}`);
  }

}
