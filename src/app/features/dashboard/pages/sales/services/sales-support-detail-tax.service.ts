import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SaleSupportDetailTax } from '../models/sale-support-detail-tax';

@Injectable({
  providedIn: 'root'
})
export class SalesSupportDetailTaxService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}SaleSupportDetailTax`;
  }

  getSaleSupportDetailTaxByDetailId(saleSupportDetailId) {
    return this.http.get<SaleSupportDetailTax[]>(`${this.endpoint}/getSaleSupportDetailTaxByDetailId?saleSupportDetailId=${saleSupportDetailId}`);
  }

}
