import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { CommercialInvoiceDetail } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CommercialInvoiceDetailService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}commercialInvoiceDetail`;
  }

  getCommercialInvoiceDetailByHeaderId(commercialInvoiceHeaderId): Observable<CommercialInvoiceDetail[]> {
    return this.http.get<CommercialInvoiceDetail[]>(
      `${this.endpoint}/getCommercialInvoiceDetailByHeaderId?commercialInvoiceHeaderId=${commercialInvoiceHeaderId}`);
  }

}
