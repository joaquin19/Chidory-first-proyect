import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceMovementsService {
  private endpoint: string;

  constructor(
     private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}balanceMovementHeader`;
  }

  getBalanceMovements(): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/getBalanceMovements`);
  }

  getBalanceMovementById(balanceMovementId): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/getBalanceMovementById?balanceMovementId=${balanceMovementId}`);
  }

  getBalanceMovementByIdAccountBankId(balanceMovementId, accountBankId): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/getBalanceMovementByIdAccountBankId?balanceMovementId=${balanceMovementId}&accountBankId=${accountBankId}`);
  }

  getBalanceMovementByAccountBankId(accountBankId): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/getBalanceMovementByAccountBankId?accountBankId=${accountBankId}`);
  }

  getBalanceMovementByAccountBankLastMovement(accountBankId): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/getBalanceMovementByAccountBankLastMovement?accountBankId=${accountBankId}`);
  }

  saveBalanceMovement(saveBalanceMovements): Observable<any> {
    return this.http.post<any[]>(`${this.endpoint}/saveBalanceMovement`, saveBalanceMovements);
  }

  updateBalanceMovement(saveBalanceMovements): Observable<any> {
    return this.http.post<any[]>(`${this.endpoint}/updateBalanceMovement`, saveBalanceMovements);
  }

  deleteBalanceMovement(balanceMovementId, deleteBy): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}/deleteBalanceMovement?balanceMovementId=${balanceMovementId}&deleteBy=${deleteBy}`);
  }
}
