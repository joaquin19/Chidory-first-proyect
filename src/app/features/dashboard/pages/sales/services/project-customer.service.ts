import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlApiUtil } from '../../../../../core/utils/api-url-util';
import { ProjectCustomer } from '../models/project-customer';

@Injectable({
  providedIn: 'root'
})
export class ProjectCustomerService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `ProjectCustomer`;
  }

  getProjectCustomers(projectId): Observable<any> {
    return this.http.get<ProjectCustomer[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/GetProjectCustomers?projectId=${projectId}`);
  }

}
