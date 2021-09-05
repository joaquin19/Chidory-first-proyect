import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}plant`;
  }

  getPlants(): Observable<any> {
    return this.http.get<[Plant]>(`${this.endpoint}/getPlants`);
  }


}
