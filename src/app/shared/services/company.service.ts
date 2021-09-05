import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Company } from '../models/company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}company`;
  }

  getCompanyById(companyId): Observable<Company> {
    return this.http.get<Company>(`${this.endpoint}/getCompanyById?companyId=${companyId}`);
  }

}
