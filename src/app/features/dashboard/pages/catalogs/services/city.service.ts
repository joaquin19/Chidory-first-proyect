import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { City } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}city`;
  }

  getCities(stateId): Observable<City[]> {
    return this.http.get<City[]>(`${this.endpoint}/getCities?stateId=${stateId}`);
  }

}
