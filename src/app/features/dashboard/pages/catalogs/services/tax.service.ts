import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Tax } from '../models/tax';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}tax`;
  }

  getTaxes() {
    return this.http.get<Tax[]>(`${this.endpoint}/getTaxes`);
  }

  getTaxesByArticleId(articleId) {
    return this.http.get<Tax[]>(`${this.endpoint}/getTaxesByArticleId?articleId=${articleId}`);
  }

  getTaxesByProductId(productId) {
    return this.http.get<Tax[]>(`${this.endpoint}/getTaxesByProductId?productId=${productId}`);
  }

}
