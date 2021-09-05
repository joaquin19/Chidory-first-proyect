import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { UnitMeasure } from '../models/unit-measure';


@Injectable({
  providedIn: 'root'
})
export class UnitMeasureService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}unitMeasure`;
  }

  getUnitsMeasure() {
    return this.http.get<UnitMeasure[]>(`${this.endpoint}/getUnitsMeasure`);
  }

}
