import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { ExportProduct } from '../models/export-product';

@Injectable({
  providedIn: 'root'
})
export class ExportProductService {

  private endpoint: string;
  private endPointProdSAT: string;
  private endPointUnitSAT: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `ExportProduct`;
    this.endPointProdSAT = `ClaveProdServSAT`;
    this.endPointUnitSAT = `ClaveUnidadSAT`;
  }

  getExportProducts(customerId = 0): Observable<any> {
    return this.http.get<ExportProduct[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/GetExportProducts?customerId=${customerId}`);
  }

  getExportProductById(exportProductId): Observable<any> {
    return this.http.get<ExportProduct[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/GetExportProductById?exportProductId=${exportProductId}`);
  }

  saveExportProduct(exportProductSave): Observable<any> {
    return this.http.post<ExportProduct[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/SaveExportProduct`, exportProductSave);
  }

  updateExportProduct(exportProductSave): Observable<any> {
    return this.http.put<ExportProduct[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/UpdateExportProduct`, exportProductSave);
  }

  deleteExportProduct(exportProductId, deleteBy): Observable<any> {
    return this.http.delete<ExportProduct[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/DeleteExportProduct?exportProductId=${exportProductId}&deleteBy=${deleteBy}`);
  }

  getCodeProductServiceSAT(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPointProdSAT}/GetClaveProdServSAT`);
  }

  getCodeUnitSAT(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPointUnitSAT}/GetClaveUnidadSAT`);
  }
}
