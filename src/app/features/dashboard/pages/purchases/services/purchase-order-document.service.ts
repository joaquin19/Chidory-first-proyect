import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { PurchaseOrderDocument } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderDocumentService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}purchaseOrderDocument`;
  }

  getPurchaseOrderDocumentsByHeaderId(purchaseOrderId): Observable<PurchaseOrderDocument[]> {
    return this.http.get<PurchaseOrderDocument[]>(`${this.endpoint}/getPurchaseOrderDocumentsByHeaderId?purchaseOrderId=${purchaseOrderId}`);
  }

  downloadPurchaseOrderDocument(purchaseOrderSave): Observable<Blob> {
    return this.http.post<Blob>(`${this.endpoint}/downloadPurchaseOrderDocument`, purchaseOrderSave, { responseType: 'blob' as 'json' });
  }

  deletePurchaseOrderDocument(purchaseOrderId, documentId, documentName, path, deleteBy): Observable<PurchaseOrderDocument[]> {
    return this.http.delete<PurchaseOrderDocument[]>(`${this.endpoint}/deletePurchaseOrderDocument?purchaseOrderId=${purchaseOrderId}&documentId=${documentId}&documentName=${documentName}&path=${path}&deleteBy=${deleteBy}`);
  }

}
