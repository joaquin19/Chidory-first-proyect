import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}invoice`;
  }

  getInvoice(apiInvoice): Observable<Invoice> {
    return this.http.post<any>(`${this.endpoint}/getInvoice`, apiInvoice);
  }
}
