import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}article`;
  }

  getArticles(supplierId = 0): Observable<any> {
    return this.http.get<Article[]>(`${this.endpoint}/getArticles?supplierId=${supplierId}`);
  }

  getArticleById(articleId): Observable<any> {
    return this.http.get<Article[]>(`${this.endpoint}/getArticleById?articleId=${articleId}`);
  }

  saveArticle(articleSave): Observable<any> {
    return this.http.post<Article[]>(`${this.endpoint}/saveArticle`, articleSave);
  }

  updateArticle(articleSave): Observable<any> {
    return this.http.put<Article[]>(`${this.endpoint}/updateArticle`, articleSave);
  }

  deleteArticle(articleId, deleteBy): Observable<any> {
    return this.http.delete<Article[]>(`${this.endpoint}/deleteArticle?articleId=${articleId}&deleteBy=${deleteBy}`);
  }

}
