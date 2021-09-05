import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { StateProvince } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StateProvinceService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}stateProvince`;
  }

  getStatesProvinces(countryId): Observable<StateProvince[]> {
    return this.http.get<StateProvince[]>(`${this.endpoint}/getStatesProvinces?countryId=${countryId}`);
  }

}
