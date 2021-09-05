import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { PurchaseOrderHeader } from '@app/features/dashboard/pages/purchases/models';

@Injectable({
  providedIn: 'root'
})
export class SuppliersPortalService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}suppliersPortal`;
  }

  getPurchaseOrderById(supplierId: number, purchaseOrderId: number): Observable<PurchaseOrderHeader> {
    return this.http.get<PurchaseOrderHeader>(`${this.endpoint}/getPurchaseOrderById?supplierId=${supplierId}&purchaseOrderId=${purchaseOrderId}`);
  }

  getPurchaseOrdersAmounts(purchaseOrderAmountSave: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/getPurchaseOrdersAmounts`, purchaseOrderAmountSave);
  }

  sendInvoice(form: FormData): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/sendInvoice`, form);
  }

}
