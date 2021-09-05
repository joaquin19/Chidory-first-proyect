import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { BusinessUnit } from '../models/business-unit';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}businessUnit`;
  }

  getBusinessUnits(): Observable<any> {
    return this.http.get<[BusinessUnit]>(`${this.endpoint}/getBusinessUnits`);
  }

  getBusinessUnitById(businessUnitId): Observable<any> {
    return this.http.get<BusinessUnit[]>(`${this.endpoint}/getBusinessUnitById?businessUnitId=${businessUnitId}`);
  }

  saveBusinessUnit(businessUnitSave): Observable<any> {
    return this.http.post<BusinessUnit[]>(`${this.endpoint}/saveBusinessUnit`, businessUnitSave);
  }

  updateBusinessUnit(businessUnitSave): Observable<any> {
    return this.http.put<BusinessUnit[]>(`${this.endpoint}/updateBusinessUnit`, businessUnitSave);
  }

  deleteBusinessUnit(businessUnitId, deleteBy): Observable<any> {
    return this.http.delete<BusinessUnit[]>(`${this.endpoint}/deleteBusinessUnit?businessUnitId=${businessUnitId}&deleteBy=${deleteBy}`);
  }

}
