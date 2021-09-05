import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { RequisitionDocument } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RequisitionDocumentService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}requisitionDocument`;
  }

  getRequisitionDocumentsByHeaderId(RequisitionId): Observable<RequisitionDocument[]> {
    return this.http.get<RequisitionDocument[]>(`${this.endpoint}/getRequisitionDocumentsByHeaderId?RequisitionId=${RequisitionId}`);
  }

  downloadRequisitionDocument(requisitionSave): Observable<Blob> {
    return this.http.post<Blob>(`${this.endpoint}/downloadRequisitionDocument`, requisitionSave, { responseType: 'blob' as 'json' });
  }

  deleteRequisitionDocument(requisitionId, documentId, documentName, path, deleteBy): Observable<RequisitionDocument[]> {
    return this.http.delete<RequisitionDocument[]>(`${this.endpoint}/deleteRequisitionDocument?requisitionId=${requisitionId}&documentId=${documentId}&documentName=${documentName}&path=${path}&deleteBy=${deleteBy}`);
  }

}
