import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceMovementsDetailService {

  private endpoint: string;

  constructor(
     private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}balanceMovementDetail`;
  }

  getBalanceMovementDetailById(balanceMovementId): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/getBalanceMovementDetailById?balanceMovementId=${balanceMovementId}`);
  }

  getBalanceMovementDetailByHeaderId(balanceMovementHeaderId): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/getBalanceMovementDetailByHeaderId?balanceMovementHeaderId=${balanceMovementHeaderId}`);
  }

  updateBalanceMovementDetail(saveBalanceMovementDetail): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/updateBalanceMovementDetail`, saveBalanceMovementDetail);
  }

  deleteBalanceMovementDetail(balanceMovementId, deleteBy): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/deleteBalanceMovementDetail?balanceMovementId=${balanceMovementId}&deleteBy=${deleteBy}`);
  }
}
