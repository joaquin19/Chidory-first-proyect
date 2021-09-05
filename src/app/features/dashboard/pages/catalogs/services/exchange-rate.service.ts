import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `ExchangeRate`;
  }

  getExchangeRates(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/GetExchangeRates`);
  }

  getExchangeRateById(exchangeRateId): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/GetExchangeRateById?ExchangeRateId=${exchangeRateId}`);
  }

  saveExchangeRate(exchangeRateSave): Observable<any> {
    return this.http.post<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/SaveExchangeRate`, exchangeRateSave);
  }

  updateExchangeRate(exchangeRateSave): Observable<any> {
    return this.http.put<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/UpdateExchangeRate`, exchangeRateSave);
  }

  deleteExchangeRate(exchangeRateId, deleteBy): Observable<any> {
    return this.http.delete<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/DeleteExchangeRate?exchangeRateId=${exchangeRateId}&deleteBy=${deleteBy}`);
  }
}
