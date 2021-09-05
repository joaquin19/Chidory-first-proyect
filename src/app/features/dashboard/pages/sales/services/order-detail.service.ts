import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { OrderDetail } from '../models/order-detail';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}OrderDetail`;
  }

  getOrderDetailByHeaderId(orderHeaderId) {
    return this.http.get<OrderDetail[]>(`${this.endpoint}/getOrderDetailByHeaderId?orderHeaderId=${orderHeaderId}`);
  }

  getOrderDetailByModel(customerId, startDate, endDate, currencyId, model) {
    return this.http.get<OrderDetail[]>(`${this.endpoint}/getOrderDetailByModel?customerId=${customerId}`
      + `&startDate=${startDate}&endDate=${endDate}&currencyId=${currencyId}&model=${model}`);
  }

}