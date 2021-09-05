import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { PurchaseOrderDetailTax } from '../models';


@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderDetailTaxService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}purchaseOrderDetailTax`;
  }

  getPurchaseOrderDetailTaxByPOH(purchaseOrderId): Observable<PurchaseOrderDetailTax[]> {
    return this.http.get<PurchaseOrderDetailTax[]>(`${this.endpoint}/getPurchaseOrderDetailTaxByPOH?purchaseOrderId=${purchaseOrderId}`);
  }

  getPurchaseOrderDetailTaxByPOD(purchaseOrderDetailId): Observable<PurchaseOrderDetailTax[]> {
    return this.http.get<PurchaseOrderDetailTax[]>(`${this.endpoint}/getPurchaseOrderDetailTaxByPOD?purchaseOrderDetailId=${purchaseOrderDetailId}`);
  }

}
