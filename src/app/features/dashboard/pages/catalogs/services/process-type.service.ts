import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { ProcessType } from '../models/process-type';

@Injectable({
  providedIn: 'root'
})
export class ProcessTypeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}processType`;
  }

  getProcessTypes() {
    return this.http.get<ProcessType[]>(`${this.endpoint}/getProcessTypes`);
  }

}
