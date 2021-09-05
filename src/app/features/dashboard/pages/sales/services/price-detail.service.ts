import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { PriceDetail } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PriceDetailService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}priceDetail`;
  }

  getPriceDetailByHeaderId(priceHeaderId): Observable<PriceDetail[]> {
    return this.http.get<PriceDetail[]>(`${this.endpoint}/GetPriceDetailByHeaderId?priceHeaderId=${priceHeaderId}`);
  }

}
