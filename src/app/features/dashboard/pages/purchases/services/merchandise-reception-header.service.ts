import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlApiUtil } from '../../../../../core/utils/api-url-util';
import * as moment from 'moment';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchandiseReceptionHeaderService {

  private endpointReceptionHeader: string;
  private endPointReceptionDoc: string;
  private enddPointReceptionDetail: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpointReceptionHeader = `${UrlApiUtil.getApiUrl()}merchandiseReceptionHeader`;
    this.endPointReceptionDoc = `${UrlApiUtil.getApiUrl()}merchandiseReceptionDocument`;
    this.enddPointReceptionDetail = `${UrlApiUtil.getApiUrl()}merchandiseReceptionDetail`;
  }

  getMerchandiseReceptions(): Observable<any> {
    return this.http.get<any[]>(`${this.endpointReceptionHeader}/getMerchandiseReceptions`);
  }

  getMerchandiseReceptionByPurchaseOrderId(purchaseOrderHeaderId): Observable<any> {
    return this.http.get<any[]>(`${this.endpointReceptionHeader}/getMerchandiseReceptionByPurchaseOrderId?purchaseOrderHeaderId=${purchaseOrderHeaderId}`);
  }

  getPurchaseOrderByFolio(folio): Observable<any> {
    return this.http.get<any[]>(`${this.endpointReceptionHeader}/getPurchaseOrderByFolio?folio=${folio}`);
  }

  saveMerchandiseReception(merchandiseReceptionSave): Observable<any> {
    return this.http.post<any[]>(`${this.endpointReceptionHeader}/saveMerchandiseReception`, merchandiseReceptionSave);
  }

  // ==================================================================== //

  getMerchandiseReceptionDocumentsByMRH(merchandiseReceptionId): Observable<any> {
    return this.http.get<any[]>(`${this.endPointReceptionDoc}/getMerchandiseReceptionDocumentsByMRH?merchandiseReceptionId=${merchandiseReceptionId}`);
  }

  getMerchandiseReceptionDocumentsByMRD(merchandiseReceptionId, merchandiseReceptionDetailId): Observable<any> {
    return this.http.get<any[]>(`${this.endPointReceptionDoc}/getMerchandiseReceptionDocumentsByMRD?merchandiseReceptionId=${merchandiseReceptionId}&merchandiseReceptionDetailId=${merchandiseReceptionDetailId}`);
  }

  downloadMerchandiseReceptionDocument(merchandiseReceptionDocument): Observable<any> {
    return this.http.post<any[]>(`${this.endPointReceptionDoc}/downloadMerchandiseReceptionDocument`, merchandiseReceptionDocument, {
      responseType: 'blob' as 'json'
    });
  }

  deleteMerchandiseReceptionDocument(merchandiseReceptionId, merchandiseReceptionDetailId, deleteBy): Observable<any> {
    return this.http.delete<any[]>(`${this.endPointReceptionDoc}/deleteMerchandiseReceptionDocument?merchandiseReceptionId=${merchandiseReceptionId}&merchandiseReceptionDetailId=${merchandiseReceptionDetailId}&deleteBy=${deleteBy}`);
  }

  // ==================================================================== //

  getMerchandiseReceptionDetailByPOH(purchaseOrderHeaderId): Observable<any> {
    return this.http.get<any[]>(`${this.enddPointReceptionDetail}/getMerchandiseReceptionDetailByPOH?purchaseOrderHeaderId=${purchaseOrderHeaderId}`);
  }

  saveMerchandiseReceptionDetail(form): Observable<any> {
    return this.http.post<any[]>(`${this.enddPointReceptionDetail}/saveMerchandiseReceptionDetail`, form);
  }

  deleteMerchandiseReceptionDetail(merchandiseReceptionId, merchandiseReceptionDetailId, deleteBy): Observable<any> {
    return this.http.delete<any[]>(`${this.enddPointReceptionDetail}/deleteMerchandiseReceptionDetail?merchandiseReceptionId=${merchandiseReceptionId}&merchandiseReceptionDetailId=${merchandiseReceptionDetailId}&deleteBy=${deleteBy}`);
  }

  /**
   * Construccion de PDF
   */

  getDocumentDefinition(data: any, dataParent: any, logo: any, purchaseOrder: any, documents: any) {
    return {
      pageSize: 'A4',
      header: (currentPage) => {
        if (currentPage > 1) {
          return [
            {
              text: `${purchaseOrder.businessUnitName} (${purchaseOrder.costCenterName})`,
              style: 'labelHeaderPagin'
            }
          ];
        }
      },
      footer: {
        columns: [
          {
            text: `${dataParent.createdOn} - Folio PO: ${purchaseOrder.folio}`,
            style: 'labelHeaderPagin'
          }
        ]
      },
      content: [
        {
          columns: [
            [
              {
                text: `${purchaseOrder.businessUnitName} (${purchaseOrder.costCenterName})`,
                style: 'labelBusinessUnit'
              },
              {
                columns: [
                  {
                    image: `${logo}`,
                    width: 70,
                    height: 20
                  },
                  { width: 190, text: 'KRAEM, S.A. DE C.V.', style: 'nameCompany' }
                ]
              },
              {
                text: 'AVENIDA INDUSTRIAL #560, FINSA, GUADALUPE, N.L, C.P. 67132',
                style: 'tableItemLeft'
              },
              {
                text: '',
                style: 'spaceSection'
              }
            ]
          ]
        },
        {
          height: 20,
          text: 'RECEPCIÓN DE MATERIAL O SERVICIO',
          style: 'labelSupplier'
        },
        {
          text: '',
          style: 'spaceSection'
        },
        {
          text: '',
          margin: [0, 3, 0, 0]
        },
        {
          columns: [
            {
              width: 120, height: 20, style: { alignment: 'right' }, table: {
                widths: [50, 445],
                body: [
                  [
                    { text: 'PROVEEDOR', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${purchaseOrder.supplierName}`, style: 'tableItemLeft' }
                  ],
                  [
                    { text: 'MATERIAL', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.fullName}`, style: 'tableItemLeft' }
                  ],
                  [
                    { text: 'CANTIDAD', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.receivedQuantity}`, style: 'tableItemLeft' }
                  ],
                  [
                    { text: 'ETA', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${moment(`${dataParent.receptionDate}`, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY')}`, style: 'tableItemLeft' }
                  ],
                  [
                    { text: 'PO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${purchaseOrder.folio}`, style: 'tableItemLeft' }
                  ]
                ]
              },
            }
          ]
        },
        {
          text: '',
          style: 'spaceSection'
        },
        this.getImages(documents, data),
      ],
      styles: {
        nameCompany: { bold: true, fontSize: 15, color: 'black', alignment: 'left', margin: [0, 5, 0, 0] },
        labelFolioRight: { fontSize: 7, color: 'black', alignment: 'right' },
        labelFolioLeft: { fontSize: 7, color: 'black', alignment: 'left' },
        labelHeader: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldHeader: { fontSize: 10, color: 'black', alignment: 'center' },
        tableHeaderCenter: { bold: true, fontSize: 9, color: 'black', alignment: 'center' },
        tableHeaderRight: { bold: true, fontSize: 9, color: 'black', alignment: 'right' },
        tableHeaderLeft: { bold: true, fontSize: 8, color: 'black', alignment: 'left' },
        tableItemCenter: { fontSize: 8, color: 'black', alignment: 'center' },
        tableItemRight: { fontSize: 8, color: 'black', alignment: 'right' },
        tableItemLeft: { fontSize: 8, color: 'black', alignment: 'left' },
        labelSubTotal: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldSubTotal: { fontSize: 8, color: 'black', alignment: 'right' },
        labelTotal: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldTotal: { fontSize: 8, color: 'black', alignment: 'right' },
        tableLabelRight: { fontSize: 5, color: 'black', alignment: 'right' },
        tableLabelCenter: { fontSize: 5, color: 'black', alignment: 'center' },
        tableRight: { margin: [88, 0, 0, 0] },
        tableAuthorizationRight: { margin: [70, 0, 0, 0] },
        tableAuthorization: { margin: [0, 20, 0, 10] },
        labelRMS: {
          bold: true,
          fontSize: 15,
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

  getImages(documents, data) {
    let complit = false;
    let firstImage = '';
    let listadoImage = [];
    documents.map((t, indexT) => {
      if (t.imageBase64 !== '' && data.id == t.merchandiseReceptionDetailId) {
        if (complit) {
          listadoImage.push([
            {
              image: `data:image/png;base64,${firstImage}`, width: 180, border: [false, false, false, false]
            },
            {
              image: `data:image/png;base64,${t.imageBase64}`, width: 180, border: [false, false, false, false]
            }
          ]);
          firstImage = '';
          complit = false;
        } else {
          firstImage = t.imageBase64;
          complit = true;
        }
      }
    });
    if (firstImage !== '') {
      listadoImage.push([
        {
          image: `data:image/png;base64,${firstImage}`, width: 180, border: [false, false, false, false]
        },
        {
          text: ' ', width: 150, border: [false, false, false, false]
        }
      ]);
    }

    if (listadoImage.length > 0) {
      return {
        columns: [
          {
            width: 120, height: 20, style: { alignment: 'right' },
            table: {
              widths: [250, 250],
              body: [
                ...listadoImage
              ]
            }
          }
        ]
      };
    }
  }

  /**
 * Fin Construccion de PDF
 */

}
