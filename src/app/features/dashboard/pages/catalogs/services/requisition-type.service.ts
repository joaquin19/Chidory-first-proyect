import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { RequisitionType } from '../models/requisition-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisitionTypeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}RequisitionType`;
  }

  getRequisitionTypes(): Observable<any> {
    return this.http.get<RequisitionType[]>(`${this.endpoint}/getRequisitionTypes`);
  }

}
