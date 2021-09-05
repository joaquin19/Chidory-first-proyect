import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalImagesService {

  constructor(
    private http: HttpClient
  ) {
  }

  getLogo() {
    return this.http.get('assets/images/KOPS_Logo.png', { responseType: 'blob' });
  }

  getLogoKR() {
    return this.http.get('assets/images/Logo KR.png', { responseType: 'blob' });
  }

}