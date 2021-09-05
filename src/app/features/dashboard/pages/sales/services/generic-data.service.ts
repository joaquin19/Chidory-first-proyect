import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericDataService {

  private endpointCustomer: string;
  private endPoitnProjectCustomer: string;
  private endPointCurrency: string;
  private endPointBank: string;
  private endPointUnitMeassure: string;
  private endPointDepartment: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpointCustomer = `customer`;
    this.endPoitnProjectCustomer = `ProjectCustomer`;
    this.endPointCurrency = `currency`;
    this.endPointBank = `bank`;
    this.endPointUnitMeassure = `unitMeasure`;
    this.endPointDepartment = `Department`;
  }

  getCustomer(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpointCustomer}/GetCustomers`);
  }

  getCustomerById(customerId): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpointCustomer}/GetCustomerById?CustomerId=${customerId}`);
  }

  getProjectCustomers(projectId): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPoitnProjectCustomer}/GetProjectCustomers?projectId=${projectId}`);
  }

  getCurrencies(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPointCurrency}/getCurrencies`);
  }

  getBanks(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPointBank}/getBanks`);
  }

  getUnitsMeasure(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPointUnitMeassure}/getUnitsMeasure`);
  }

  getDepartment(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPointDepartment}/getDepartment`);
  }
}
