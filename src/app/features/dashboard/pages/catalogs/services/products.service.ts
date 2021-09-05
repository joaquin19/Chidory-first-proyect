import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private endpoint: string;
  private endPointLevel: string;
  private endPointType: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `Product`;
    this.endPointLevel = `ProductLevel`;
    this.endPointType = `ProductType`;
  }

  getProducts(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/GetProducts`);
  }

  getProductById(productId): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/GetProductById?productId=${productId}`);
  }

  saveProduct(productSave): Observable<any> {
    return this.http.post<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/SaveProduct`, productSave);
  }

  updateProduct(productSave): Observable<any> {
    return this.http.put<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/UpdateProduct`, productSave);
  }

  deleteProduct(productId, deleteBy): Observable<any> {
    return this.http.delete<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/DeleteProduct?productId=${productId}&deleteBy=${deleteBy}`);
  }

  getProductTypes(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPointType}/GetProductTypes`);
  }

  getProductLevels(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPointLevel}/GetProductLevels`);
  }
}
