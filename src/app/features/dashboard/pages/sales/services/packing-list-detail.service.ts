import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { PackingListDetail } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PackingListDetailService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}packingListDetail`;
  }

  getPackingListDetailByHeaderId(packingListHeaderId): Observable<PackingListDetail[]> {
    return this.http.get<PackingListDetail[]>(
      `${this.endpoint}/getPackingListDetailByHeaderId?packingListHeaderId=${packingListHeaderId}`);
  }

}
