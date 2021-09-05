import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlApiUtil } from '../../../../../core/utils/api-url-util';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private endPoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endPoint = `Project`;
  }

  getProjects(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPoint}/GetProjects`);
  }

  getProjectsById(projectId): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPoint}/GetProjectById?projectId=${projectId}`);
  }

  saveProjects(projectSave): Observable<any> {
    return this.http.post<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPoint}/SaveProject`, projectSave);
  }

  updateProjects(projectSave): Observable<any> {
    return this.http.put<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPoint}/UpdateProject`, projectSave);
  }

  deleteProjects(projectId, deleteBy): Observable<any> {
    return this.http.delete<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPoint}/DeleteProject?projectId=${projectId}&deleteBy=${deleteBy}`);
  }

}
