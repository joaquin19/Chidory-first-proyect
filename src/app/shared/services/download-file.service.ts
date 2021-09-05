import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';

@Injectable({
    providedIn: 'root'
})
export class DownloadFileService {

    private endpoint: string;

    constructor(
        private http: HttpClient
    ) {
        this.endpoint = `${UrlApiUtil.getApiUrl()}downloadFile`;
    }

    getTemplate(templateId): Observable<Blob> {
        return this.http.get<Blob>(`${this.endpoint}/getTemplate?templateId=${templateId}`, { responseType: 'blob' as 'json' });
    }

    getFile(fileDownload): Observable<Blob> {
        return this.http.post<Blob>(`${this.endpoint}/getFile`, fileDownload, { responseType: 'blob' as 'json' });
    }


}