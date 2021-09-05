import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { ArticleType } from '../models/article-type';

@Injectable({
  providedIn: 'root'
})
export class ArticleTypeService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}articleType`;
  }

  getArticleTypes() {
    return this.http.get<ArticleType[]>(`${this.endpoint}/getArticleTypes`);
  }

}
