import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Country } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}country`;
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.endpoint}/getCountries`);
  }

}
