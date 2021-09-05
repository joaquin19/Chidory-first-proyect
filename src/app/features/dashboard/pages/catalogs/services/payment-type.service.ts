import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { PaymentType } from '../models/payment-type';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}paymentType`;
  }

  getPaymentTypes() {
    return this.http.get<PaymentType[]>(`${this.endpoint}/getPaymentTypes`);
  }

}
