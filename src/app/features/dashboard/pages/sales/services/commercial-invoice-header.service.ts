import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { CommercialInvoiceHeader } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CommercialInvoiceHeaderService {

  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}commercialInvoiceHeader`;
  }

  getCommercialInvoices(userName): Observable<CommercialInvoiceHeader[]> {
    return this.http.get<CommercialInvoiceHeader[]>(`${this.endpoint}/getCommercialInvoices?userName=${userName}`);
  }

  getCommercialInvoiceById(commercialInvoiceId): Observable<CommercialInvoiceHeader> {
    return this.http.get<CommercialInvoiceHeader>(`${this.endpoint}/getCommercialInvoiceById?commercialInvoiceId=${commercialInvoiceId}`);
  }

  saveCommercialInvoice(form: FormData): Observable<CommercialInvoiceHeader> {
    return this.http.post<CommercialInvoiceHeader>(`${this.endpoint}/saveCommercialInvoice`, form);
  }

  updateCommercialInvoice(form: FormData): Observable<CommercialInvoiceHeader> {
    return this.http.put<CommercialInvoiceHeader>(`${this.endpoint}/updateCommercialInvoice`, form);
  }

  deleteCommercialInvoice(commercialInvoiceId, deleteBy): Observable<CommercialInvoiceHeader> {
    return this.http.delete<CommercialInvoiceHeader>(`${this.endpoint}/deleteCommercialInvoice?commercialInvoiceId=${commercialInvoiceId}&deleteBy=${deleteBy}`);
  }

}
