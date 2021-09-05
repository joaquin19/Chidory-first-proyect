import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SupplierInvoiceDetail } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SupplierInvoiceDetailService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}supplierInvoiceDetail`;
  }

  getSupplierInvoiceDetails(): Observable<SupplierInvoiceDetail[]> {
    return this.http.get<SupplierInvoiceDetail[]>(`${this.endpoint}/getSuppliers`);
  }

  getSupplierInvoiceDetailById(supplierId): Observable<SupplierInvoiceDetail> {
    return this.http.get<SupplierInvoiceDetail>(`${this.endpoint}/getSupplierById?supplierId=${supplierId}`);
  }

  getSupplierInvoiceDetailByReconciliationId(reconciliationId): Observable<SupplierInvoiceDetail> {
    return this.http.get<SupplierInvoiceDetail>(`${this.endpoint}/getSupplierInvoiceDetailByReconciliationId?reconciliationId=${reconciliationId}`);
  }

  saveSupplierInvoiceDetail(form: FormData): Observable<SupplierInvoiceDetail> {
    return this.http.post<SupplierInvoiceDetail>(`${this.endpoint}/saveSupplier`, form);
  }

}
