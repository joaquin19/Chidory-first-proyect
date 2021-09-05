import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { CostCenter } from '../models/cost-center';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}costCenter`;
  }

  getCostCenters(): Observable<any> {
    return this.http.get<[CostCenter]>(`${this.endpoint}/getCostCenters`);
  }

  getCostCenterByBusinessUnitId(businessUnitId): Observable<any> {
    return this.http.get<[CostCenter]>(`${this.endpoint}/getCostCenters?businessUnitId=${businessUnitId}`);
  }

  getCostCenterById(costCenterId): Observable<any> {
    return this.http.get<CostCenter[]>(`${this.endpoint}/getCostCenterById?costCenterId=${costCenterId}`);
  }

  saveCostCenter(costCenterSave): Observable<any> {
    return this.http.post<CostCenter[]>(`${this.endpoint}/saveCostCenter`, costCenterSave);
  }

  updateCostCenter(costCenterSave): Observable<any> {
    return this.http.put<CostCenter[]>(`${this.endpoint}/updateCostCenter`, costCenterSave);
  }

  deleteCostCenter(costCenterId, deleteBy): Observable<any> {
    return this.http.delete<CostCenter[]>(`${this.endpoint}/deleteCostCenter?costCenterId=${costCenterId}&deleteBy=${deleteBy}`);
  }

}
