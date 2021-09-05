import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { PackingListHeader } from '../models';
import { PackingListStatus } from '@app/shared/enums';

@Injectable({
  providedIn: 'root'
})
export class PackingListHeaderService {

  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}packingListHeader`;
  }

  getPackingLists(userName): Observable<PackingListHeader[]> {
    return this.http.get<PackingListHeader[]>(`${this.endpoint}/getPackingLists?userName=${userName}`);
  }

  getPackingListById(packingListId): Observable<PackingListHeader> {
    return this.http.get<PackingListHeader>(`${this.endpoint}/getPackingListById?packingListId=${packingListId}`);
  }

  savePackingList(form: FormData): Observable<PackingListHeader> {
    return this.http.post<PackingListHeader>(`${this.endpoint}/savePackingList`, form);
  }

  updatePackingList(form: FormData): Observable<PackingListHeader> {
    return this.http.put<PackingListHeader>(`${this.endpoint}/updatePackingList`, form);
  }

  deletePackingList(packingListId, deleteBy): Observable<PackingListHeader> {
    return this.http.delete<PackingListHeader>(`${this.endpoint}/deletePackingList?packingListId=${packingListId}&deleteBy=${deleteBy}`);
  }

  getPackingListsByCustomerId(customerId): Observable<PackingListHeader[]> {
    return this.http.get<PackingListHeader[]>(`${this.endpoint}/getPackingListsByCustomerId?customerId=${customerId}`);
  }

  /**
   * Construccion de PDF
   */

  getDocumentDefinition(dataParent: any, listProducts: any) {
    return {
      header: (currentPage) => {
        if (currentPage > 1) {
          return [
            {
              text: `${dataParent.businessUnitName} (${dataParent.costCenterName})`,
              style: 'labelHeaderPagin'
            }
          ];
        }
      },
      footer: {
        columns: [
          {
            text: 'PACKING LIST',
            style: 'labelFooterPagin'
          }
        ]
      },
      watermark: this.getWaterMark(dataParent),
      content: [
        {
          columns: [
            {
              width: 120, height: 20, style: { alignment: 'right' }, margin: [-20, 0, 0, 0], table: {
                widths: [53, 53, 53, 53, 22, 21, 25, 15, 36, 28, 25, 35, 20],

                body: [
                  [
                    { colSpan: 13, text: 'PACKING LIST', style: 'labelSupplier' }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'SELLER', style: 'tableItemLeft', border: [true, true, true, false] },
                    {}, {}, {},
                    { colSpan: 5, text: 'Invoice No.', style: 'tableItemLeft', border: [true, false, false, false] },
                    {}, {}, {}, {},
                    { colSpan: 4, text: 'PO No.', fillColor: '#DBDBDB', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'KRAEM', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {},
                    { colSpan: 5, text: 'DHS4564564', style: 'tableItemLeft', border: [true, false, false, false] },
                    {}, {}, {}, {},
                    { colSpan: 4, text: '', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'COL. ', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {},
                    { colSpan: 9, text: 'Container No = ', style: 'tableItemLeft', },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'TEL: ', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {},
                    { colSpan: 9, text: 'SEAL NO = ', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'FAX: ', style: 'tableItemLeft', border: [true, false, true, true] },
                    {}, {}, {},
                    { colSpan: 9, text: '', style: 'tableItemLeft', border: [true, false, true, true] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'CONSIGNEE', style: 'tableItemLeft', border: [true, true, true, false] },
                    {}, {}, {},
                    { colSpan: 9, text: 'Buyer(if other than consignee)', style: 'tableItemLeft', border: [true, true, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'MORGAN', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {},
                    { colSpan: 9, text: '', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: '1305', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {},
                    { colSpan: 9, text: '', style: 'tableItemLeft', border: [true, false, true, true] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'AL', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {},
                    { colSpan: 9, text: '', style: 'Other references', border: [true, false, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'TAX ID: ', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {},
                    { colSpan: 9, text: '(Notify)', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'TEL: ', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {},
                    { colSpan: 9, text: 'MORGAN', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'FAX: ', style: 'tableItemLeft', border: [true, false, true, true] },
                    {}, {}, {},
                    { colSpan: 9, text: '1305', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'Issue date: ', style: 'tableItemLeft', border: [true, true, true, false] },
                    {}, {}, {},
                    { colSpan: 9, text: 'AL 36108', style: 'tableItemLeft', border: [true, false, true, true] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'Departure date: ', style: 'tableItemLeft', border: [true, false, true, true] },
                    {}, {}, {},
                    { colSpan: 9, text: '(Notify 2)', style: 'tableItemLeft', border: [true, true, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 2, text: 'Vessel/flight: ', style: 'tableItemLeft', border: [true, true, false, false] },
                    {},
                    { colSpan: 2, text: 'From: ', style: 'tableItemLeft', border: [false, true, true, false] },
                    {},
                    { colSpan: 9, text: '', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 2, text: '', style: 'tableItemLeft', border: [true, false, false, true] },
                    {},
                    { colSpan: 2, text: '', style: 'tableItemLeft', border: [false, false, true, true] },
                    {},
                    { colSpan: 9, text: '', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: 'To', style: 'tableItemLeft', border: [true, true, true, false] },
                    {}, {}, {},
                    { colSpan: 9, text: '', style: 'tableItemLeft', border: [true, false, true, false] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { colSpan: 4, text: '', style: 'tableItemLeft', border: [true, false, true, true] },
                    {}, {}, {},
                    { colSpan: 9, text: '', style: 'tableItemCenter', border: [true, false, true, true] },
                    {}, {}, {}, {}, {}, {}, {}, {}
                  ],
                  [
                    { rowSpan: 2, text: 'Shipping marks', style: 'tableItemLeft', border: [true, true, false, true] },
                    { rowSpan: 2, colSpan: 3, text: 'No. & kind of pakgs: Goods description', style: 'tableItemLeft', border: [false, true, true, true] },
                    {}, {},
                    { rowSpan: 2, text: 'Division', style: 'tableItemCenter' },
                    { text: 'QA', style: 'tableItemCenter', border: [true, true, true, false] },
                    { rowSpan: 2, colSpan: 2, text: 'Quantity', style: 'tableItemCenter' },
                    {},
                    { text: 'Pack size', style: 'tableItemCenter', border: [true, true, true, false] },
                    { text: 'CMB', style: 'tableItemCenter', border: [true, true, true, false] },
                    { text: 'Box', style: 'tableItemCenter', border: [true, true, true, false] },
                    { text: 'Gross weight', style: 'tableItemLeft', border: [true, true, true, false] },
                    { rowSpan: 2, text: 'Measuremen', style: 'tableItemCenter' }
                  ],
                  [
                    {},
                    {},
                    {}, {},
                    {},
                    { text: 'Inspection', style: 'labelInspection', border: [true, false, true, true] },
                    {}, {},
                    { text: '(H*W*L)', style: 'tableItemCenter', border: [true, false, true, true] },
                    { text: '(Per pack)', style: 'tableItemCenter', border: [true, false, true, true] },
                    { text: 'Quantity', style: 'tableItemCenter', border: [true, false, true, true] },
                    { text: '(ks)', style: 'tableItemCenter', border: [true, false, true, true] },
                    {}
                  ]
                ]
              },
            }
          ]
        },
        {
          text: '',
          style: 'spaceSection'
        }
      ],
      styles: {
        labelInspection: { fontSize: 4, color: 'black', alignment: 'center' },
        nameCompany: { bold: true, fontSize: 15, color: 'black', alignment: 'left', margin: [0, 5, 0, 0] },
        labelFolioRight: { fontSize: 7, color: 'black', alignment: 'right' },
        labelFolioLeft: { fontSize: 7, color: 'black', alignment: 'left' },
        labelHeader: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldHeader: { fontSize: 10, color: 'black', alignment: 'center' },
        tableHeaderCenter: { bold: true, fontSize: 9, color: 'black', alignment: 'center' },
        tableHeaderRight: { bold: true, fontSize: 9, color: 'black', alignment: 'right' },
        tableHeaderLeft: { bold: true, fontSize: 9, color: 'black', alignment: 'left' },
        tableItemCenter: { fontSize: 6, color: 'black', alignment: 'center' },
        tableItemRight: { fontSize: 6, color: 'black', alignment: 'right' },
        tableItemLeft: { fontSize: 6, color: 'black', alignment: 'left' },
        labelSubTotal: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldSubTotal: { fontSize: 8, color: 'black', alignment: 'right' },
        labelTotal: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldTotal: { fontSize: 8, color: 'black', alignment: 'right' },
        tableLabelRight: { fontSize: 5, color: 'black', alignment: 'right' },
        tableLabelCenter: { fontSize: 5, color: 'black', alignment: 'center' },
        tableRight: { margin: [88, 0, 0, 0] },
        tableAuthorizationRight: { margin: [70, 0, 0, 0] },
        tableAuthorization: { margin: [0, 20, 0, 10] },
        labelPO: {
          bold: true,
          fontSize: 20,
          color: 'black',
          alignment: 'right',
          arial: true,
          margin: [0, 20, 0, 0],
          decoration: 'underline'
        },
        labelSupplier: { bold: true, fontSize: 15, color: 'black', alignment: 'center', arial: true },
        labelProducts: { bold: true, fontSize: 12, color: 'black', alignment: 'center', arial: true },
        boxes: { bold: true, fontSize: 10, color: 'black', alignment: 'center', margin: [0, 40, 0, 0] },
        boxAuthorization: { bold: true, fontSize: 5, color: 'black', alignment: 'center' },
        boxBodyImages: { margin: [0, 5, 0, 10] },
        spaceSection: { margin: [0, 15, 0, 10] },
        labelBusinessUnit: { fontSize: 8, color: 'black', alignment: 'left', margin: [0, -32, 0, 30] },
        labelHeaderPagin: { fontSize: 8, color: 'black', alignment: 'left', margin: [40, 10, 0, 0] },
        labelFooterPagin: { fontSize: 8, color: 'black', alignment: 'right', margin: [0, 0, 40, 0] },
        labelQuantityTotal: { fontSipze: 8, alignment: 'right' }
      },
      defaultStyle: {
        columnGap: 10
      }
    };
  }

  private getWaterMark(dataParent) {
    if (dataParent.statusId === PackingListStatus.Cancelled) {
      return {
        text: 'CANCELADA', color: 'red', opacity: 0.3
      }
    } else {
      return {
        text: ''
      }
    }
  }

  /**
 * Fin Construccion de PDF
 */
}
