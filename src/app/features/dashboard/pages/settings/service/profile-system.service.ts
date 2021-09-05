import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { ProfileSystem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileSystemService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}profileSystem`;
  }

  getProfilesSystem(): Observable<any> {
    return this.http.get<ProfileSystem[]>(`${this.endpoint}/getProfilesSystem`);
  }

  getProfileSystemById(profileSystemId): Observable<ProfileSystem> {
    return this.http.get<ProfileSystem>(`${this.endpoint}/getProfileSystemById?profileSystemId=${profileSystemId}`);
  }

  saveProfilesSystem(profileSystemSave): Observable<ProfileSystem> {
    return this.http.post<ProfileSystem>(`${this.endpoint}/saveProfileSystem`, profileSystemSave);
  }

  updateProfileSystem(profileSystemSave): Observable<ProfileSystem> {
    return this.http.put<ProfileSystem>(`${this.endpoint}/updateProfileSystem`, profileSystemSave);
  }

  deleteProfileSystem(profileSystemId, deleteBy): Observable<ProfileSystem> {
    return this.http.delete<ProfileSystem>(`${this.endpoint}/deleteProfileSystem?profileSystemId=${profileSystemId}&deleteBy=${deleteBy}`);
  }

}
