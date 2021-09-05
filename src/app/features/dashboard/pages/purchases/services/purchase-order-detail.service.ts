import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { PurchaseOrderDetail } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderDetailService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}purchaseOrderDetail`;
  }

  getPurchaseOrdersDetail(): Observable<PurchaseOrderDetail[]> {
    return this.http.get<PurchaseOrderDetail[]>(`${this.endpoint}/getPurchaseOrdersDetail`);
  }

  getPurchaseOrderDetailById(purchaseOrderDetailId): Observable<PurchaseOrderDetail> {
    return this.http.get<PurchaseOrderDetail>(`${this.endpoint}/getPurchaseOrderById?purchaseOrderDetailId=${purchaseOrderDetailId}`);
  }

  getPurchaseOrderDetailByHeaderId(purchaseOrderHeaderId): Observable<PurchaseOrderDetail[]> {
    return this.http.get<PurchaseOrderDetail[]>(`${this.endpoint}/getPurchaseOrderDetailByHeaderId?purchaseOrderHeaderId=${purchaseOrderHeaderId}`);
  }

  getPurchaseOrderDetailByReconciliation(reconciliationId): Observable<PurchaseOrderDetail[]> {
    return this.http.get<PurchaseOrderDetail[]>(`${this.endpoint}/getPurchaseOrdersDetailByReconciliation?reconciliationId=${reconciliationId}`);
  }

  savePurchaseOrderDetail(purchaseOrderSave): Observable<PurchaseOrderDetail> {
    return this.http.post<PurchaseOrderDetail>(`${this.endpoint}/savePurchaseOrder`, purchaseOrderSave);
  }

}
