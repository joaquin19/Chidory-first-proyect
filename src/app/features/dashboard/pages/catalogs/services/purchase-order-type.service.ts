import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { PurchaseOrderType } from '../models/purchase-order-type';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderTypeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}PurchaseOrderType`;
  }

  getPurchaseOrderTypes() {
    return this.http.get<PurchaseOrderType[]>(`${this.endpoint}/getPurchaseOrderTypes`);
  }

}
