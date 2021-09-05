import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { CostType } from '../models/cost-type';

@Injectable({
  providedIn: 'root'
})
export class CostTypeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}costType`;
  }

  getCostTypes(): Observable<any> {
    return this.http.get<[CostType]>(`${this.endpoint}/getCostTypes`);
  }


}
