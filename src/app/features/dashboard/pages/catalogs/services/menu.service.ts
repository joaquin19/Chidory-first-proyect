import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Menu, MenuProfileSystem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}menu`;
  }

  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.endpoint}/getMenu`);
  }

  getMenuByProfileSystemId(profileSystemId): Observable<MenuProfileSystem[]> {
    return this.http.get<MenuProfileSystem[]>(`${this.endpoint}/getMenuByProfileSystemId?profileSystemId=${profileSystemId}`);
  }

  getMenuByUser(user): Observable<MenuProfileSystem[]> {
    return this.http.get<MenuProfileSystem[]>(`${this.endpoint}/getMenuByUser?user=${user}`);
  }

}
