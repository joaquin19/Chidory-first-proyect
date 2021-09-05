import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { PriceHeader } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PriceHeaderService {

  private endPoint: string;
  private endPointDetailPrice: string;

  constructor(
    private http: HttpClient
  ) {
    this.endPoint = `${UrlApiUtil.getApiUrl()}priceHeader`;
    this.endPointDetailPrice = `${UrlApiUtil.getApiUrl()}PriceDetail`;
  }

  getPrices(userName): Observable<PriceHeader[]> {
    return this.http.get<PriceHeader[]>(`${this.endPoint}/GetPrices?userName=${userName}`);
  }

  getPriceById(priceId): Observable<PriceHeader> {
    return this.http.get<PriceHeader>(`${this.endPoint}/GetPriceById?priceId=${priceId}`);
  }

  savePrice(savePriceList): Observable<PriceHeader> {
    return this.http.post<PriceHeader>(`${this.endPoint}/SavePrice`, savePriceList);
  }

  updatePrice(savePriceList): Observable<PriceHeader> {
    return this.http.put<PriceHeader>(`${this.endPoint}/UpdatePrice`, savePriceList);
  }

  updatePriceListSendAuthorization(priceListSave): Observable<PriceHeader> {
    return this.http.put<PriceHeader>(`${this.endPoint}/UpdatePriceListSendAuthorization`, priceListSave);
  }

  deletePrice(priceId, deleteBy): Observable<PriceHeader> {
    return this.http.delete<PriceHeader>(`${this.endPoint}/DeletePrice?priceId=${priceId}&deleteBy=${deleteBy}`);
  }

  getPriceDetailByHeaderId(priceHeaderId): Observable<any> {
    return this.http.get<any>(`${this.endPointDetailPrice}/GetPriceDetailByHeaderId?priceHeaderId=${priceHeaderId}`);
  }

}
