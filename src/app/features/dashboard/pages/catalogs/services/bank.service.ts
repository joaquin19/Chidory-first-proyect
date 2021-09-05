import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Bank } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}bank`;
  }

  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.endpoint}/getBanks`);
  }

}
