import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { CustomerDocumentType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerDocumentTypeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}customerDocumentType`;
  }

  getCustomerDocumentTypes(): Observable<CustomerDocumentType[]> {
    return this.http.get<CustomerDocumentType[]>(`${this.endpoint}/getCustomerDocumentTypes`);
  }

}
