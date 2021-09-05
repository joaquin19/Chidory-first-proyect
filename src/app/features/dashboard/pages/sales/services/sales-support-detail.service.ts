import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SaleSupportDetail } from '../models/sale-support-detail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesSupportDetailService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}SaleSupportDetail`;
  }

  getSaleSupportDetailByHeaderId(saleSupportId): Observable<any> {
    return this.http.get<SaleSupportDetail[]>(`${this.endpoint}/getSaleSupportDetailByHeaderId?saleSupportId=${saleSupportId}`);
  }

}
