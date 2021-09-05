import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { SupplierInvoiceDocument } from '../models';

@Injectable({
    providedIn: 'root'
})
export class SupplierInvoiceDocumentService {

    private endpoint: string;

    constructor(
        private http: HttpClient
    ) {
        this.endpoint = `${UrlApiUtil.getApiUrl()}supplierInvoiceDocument`;
    }

    getSupplierInvoiceDocumentsByHeaderId(supplierInvoiceId): Observable<SupplierInvoiceDocument[]> {
        return this.http.get<SupplierInvoiceDocument[]>(`${this.endpoint}/getSupplierInvoiceDocumentsByHeaderId?supplierInvoiceId=${supplierInvoiceId}`);

    }

}
