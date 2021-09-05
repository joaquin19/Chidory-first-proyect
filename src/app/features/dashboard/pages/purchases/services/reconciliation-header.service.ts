import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as numeral from 'numeral';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { ReconciliationHeader } from '../models';
import { ReconciliationStatus } from '@app/shared/enums/reconciliation-status';
import { AuthorizationStatus } from '@app/shared/enums';

@Injectable({
  providedIn: 'root'
})
export class ReconciliationHeaderService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}reconciliationHeader`;
  }

  getReconciliations(stateId): Observable<ReconciliationHeader[]> {
    return this.http.get<ReconciliationHeader[]>(`${this.endpoint}/getReconciliations?stateId=${stateId}`);
  }

  getReconciliationById(reconciliationId): Observable<ReconciliationHeader[]> {
    return this.http.get<ReconciliationHeader[]>(`${this.endpoint}/getReconciliationById?reconciliationId=${reconciliationId}`);
  }

  updateReconciliationSendAuthorization(reconciliationSave): Observable<ReconciliationHeader> {
    return this.http.put<ReconciliationHeader>(`${this.endpoint}/updateReconciliationSendAuthorization`, reconciliationSave);
  }

  saveReconciliation(form: FormData): Observable<ReconciliationHeader> {
    return this.http.post<ReconciliationHeader>(`${this.endpoint}/saveReconciliation`, form);
  }

  saveSupplierInvoiceXML(form: FormData): Observable<ReconciliationHeader> {
    return this.http.post<ReconciliationHeader>(`${this.endpoint}/saveSupplierInvoiceXML`, form);
  }

  updateReconciliation(form: FormData): Observable<ReconciliationHeader> {
    return this.http.post<ReconciliationHeader>(`${this.endpoint}/updateReconciliation`, form);
  }

  deleteReconciliation(reconciliationId, deleteBy): Observable<ReconciliationHeader> {
    return this.http.delete<ReconciliationHeader>(`${this.endpoint}/deleteReconciliation?reconciliationId=${reconciliationId}&deleteBy=${deleteBy}`);
  }

  /**
   * Construccion de PDF
   */

  getDocumentDefinition(dataPO: any, dataInvoice: any, dataParent: any, logo: any, listAuthorization: any, listAuthorizers: any, logoKR: any) {
    const period = (dataParent.startPeriod != '') ? `${moment(`${dataParent.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}-${moment(`${dataParent.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}` : '';
    dataParent.previousAmount = (dataParent.previousAmount == null) ? '' : dataParent.previousAmount;
    return {
      pageSize: 'A4',
      header: (currentPage) => {
        if (currentPage > 1) {
          return [
            {
              text: '',
              style: 'labelHeaderPagin'
            }
          ];
        }
      },
      watermark: this.getWaterMark(dataParent),
      content: [
        {
          columns: [
            [
              {
                text: '',
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
            ],
            [
              this.getHistoryAuthorization(dataParent, listAuthorization, listAuthorizers, logoKR),
              // {
              //   height: 20, style: 'tableAuthorizationRight', table: {
              //     widths: [31, 30, 30, 30],
              //     body: [
              //       [
              //         { text: 'SOLICITANTE', style: 'tableLabelCenter' },
              //         { text: 'REVISO', style: 'tableLabelCenter' },
              //         { text: 'APROBO', style: 'tableLabelCenter' },
              //         { text: 'AUTORIZO', style: 'tableLabelCenter' }
              //       ],
              //       [
              //         { text: '', style: 'boxAuthorization' },
              //         { text: 'EDUARDO', style: 'boxAuthorization' },
              //         { text: 'KS.CHO', style: 'boxAuthorization' },
              //         { text: 'GE.SON', style: 'boxAuthorization' }
              //       ]
              //     ]
              //   },
              // },
              {
                text: '',
                style: 'spaceSection'
              }
            ]
          ]
        },
        {
          width: 120, height: 0, margin: [140, -22, 0, 0],
          table: {
            widths: [200],
            body: [
              [{
                height: 20,
                text: 'Confirmación Facturación',
                style: 'labelPO'
              }
              ]
            ]
          }
        },
        {
          text: '',
          style: 'spaceSection'
        },
        {
          text: 'PROVEEDOR',
          style: 'labelSupplier'
        },
        {
          columns: [
            {
              width: 120, height: 20, style: { alignment: 'right' }, table: {
                widths: [50, 160, 100, 160],
                body: [
                  [
                    { text: 'NOMBRE', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.supplierName}`, style: 'tableItemCenter' },
                    { text: 'FECHA DE RECIBIR', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.receptionDate}`, style: 'tableItemCenter' }
                  ],
                  [
                    { text: 'CONTACTO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.supplierContactName === null ? '' : dataParent.supplierContactName}`, style: 'tableItemCenter' },
                    { text: 'CONDICIONES DE PAGO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.supplierPaymentTermName}`, style: 'tableItemCenter' }
                  ],
                  [
                    { text: 'TEL.', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.phoneContact === null ? '' : dataParent.phoneContact}`, style: 'tableItemCenter' },
                    { text: 'TIPO DE PAGO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.paymentTypeName}`, style: 'tableItemCenter' }
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
        {
          columns: [
            {
              width: 120, height: 20, style: { alignment: 'right' }, margin: [0, -13, 0, 0],
              table: {
                widths: [50, 160, 100, 160],
                body: [
                  [
                    { text: 'PERIODO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.period}`, style: 'tableItemCenter' },
                    { text: 'MONTO ANTERIOR', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.previousAmount}`, style: 'tableItemCenter' }
                  ],
                ]
              }
            }
          ]
        },
        {
          text: '',
          style: 'spaceSection'
        },
        {
          columns: [
            [this.getPODetailObject(dataPO)],
            [this.getInvoiceDetailObject(dataInvoice, dataPO)]
          ]
        },
        {
          text: '',
          style: 'spaceSection'
        },
        {
          columns: [
            {
              unbreakable: true,
              width: 'auto', height: 20, table: {
                widths: [100, 388],
                body: [
                  [
                    { text: 'DISCREPANCIA', style: 'tableHeaderLeft', fillColor: '#FF8B8B' },
                    { text: `${(dataParent.discrepancy == null) ? '' : dataParent.discrepancy}`, style: 'tableHeaderLeft' }
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
        {
          columns: [
            {
              unbreakable: true,
              width: 'auto', height: 20, table: {
                widths: [100, 388],
                body: [
                  [
                    { text: 'JUSTIFICACIÓN', fillColor: '#DBDBDB', style: 'tableHeaderLeft' },
                    { text: `${(dataParent.justification == null) ? '' : dataParent.justification} `, style: 'tableHeaderLeft' }
                  ]
                ]
              },
            }
          ]
        }
      ],
      styles: {
        nameCompany: { bold: true, fontSize: 15, color: 'black', alignment: 'left', margin: [0, 5, 0, 0] },
        labelFolioRight: { fontSize: 7, color: 'black', alignment: 'right' },
        labelFolioLeft: { fontSize: 7, color: 'black', alignment: 'left' },
        labelHeader: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldHeader: { fontSize: 10, color: 'black', alignment: 'center' },
        tableHeaderCenter: { bold: true, fontSize: 6, color: 'black', alignment: 'center' },
        tableHeaderRight: { bold: true, fontSize: 9, color: 'black', alignment: 'right' },
        tableHeaderLeft: { bold: true, fontSize: 9, color: 'black', alignment: 'left' },
        tableItemCenter: { fontSize: 8, color: 'black', alignment: 'center' },
        tableItemsCenter: { fontSize: 8, color: 'black', alignment: 'center' },
        tableItemRight: { fontSize: 8, color: 'black', alignment: 'right' },
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
          fontSize: 10,
          color: 'black',
          alignment: 'center',
          arial: true,
          margin: [0, 0, 0, 0],
          decoration: 'underline'
        },
        labelSupplier: { bold: true, fontSize: 9, color: 'black', alignment: 'center', arial: true, margin: [0, -13, 0, 0] },
        labelProducts: { bold: true, fontSize: 8, color: 'black', alignment: 'center', arial: true },
        boxes: { bold: true, fontSize: 10, color: 'black', alignment: 'center', margin: [0, 40, 0, 0] },
        boxAuthorization: { bold: true, fontSize: 5, color: 'black', alignment: 'center' },
        boxBodyImages: { margin: [0, 5, 0, 10] },
        spaceSection: { margin: [0, 20, 0, 10] },
        labelBusinessUnit: { fontSize: 8, color: 'black', alignment: 'left', margin: [0, -32, 0, 30] },
        labelHeaderPagin: { fontSize: 8, color: 'black', alignment: 'left', margin: [40, 10, 0, 0] },
        labelQuantityTotal: { fontSize: 7, alignment: 'right' },
        labelQuantityTotalCenter: { fontSize: 7, alignment: 'center' }
      },
      defaultStyle: {
        columnGap: 10
      }
    };
  }

  private getPODetailObject(dataPO: any) {
    let subTotalGral = 0;
    let totalGral = 0;
    for (const item of dataPO) {
      subTotalGral = numeral(subTotalGral).value() + numeral(item.subTotal).value();
      totalGral = numeral(totalGral).value() + numeral(item.total).value();
    }
    let quantityTotal: any = 0;
    const headerTitlePO: any = [{ colSpan: 6, text: 'PO', fillColor: '#DBDBDB', style: 'labelProducts' },
    {}, {}, {}, {}, {}];
    const headersPO: any = [
      { text: 'No.', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PO NO', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'DESCRIPCIÓN', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'QTY', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO UNITARIO', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO TOTAL', fillColor: '#FFFF99', style: 'tableHeaderCenter' }
    ];

    return {
      margin: [0, -12, 0, 0],
      table: {
        headerRows: 2,
        widths: [15, 30, 100, 18, 50, 50],
        body: [
          headerTitlePO,
          headersPO,
          ...dataPO.map((o, index) => {
            quantityTotal = quantityTotal + o.quantity;
            return [
              { text: index + 1, style: 'tableItemsCenter' },
              { text: o.purchaseOrderHeaderId, style: 'tableItemsCenter' },
              { text: o.description, style: 'tableItemsCenter' },
              { text: o.quantity, style: 'tableItemsCenter' },
              { text: `${numeral(o.unitPrice).format('$0,0.0000')}`, style: 'tableItemRight' },
              { text: `${numeral(o.subTotal).format('$0,0.0000')}`, style: 'tableItemRight' }
            ];
          }),
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: 'TOTAL CANTIDAD:', style: 'labelQuantityTotal' },
            { text: `${quantityTotal}`, style: 'labelQuantityTotalCenter' },
            { text: 'SUBTOTAL', style: 'labelQuantityTotal' },
            { text: `${numeral(subTotalGral).format('$0,0.00')}`, style: 'labelQuantityTotal' }
          ],
          // [
          //   { text: '', border: [false, false, false, false] },
          //   { text: '', border: [false, false, false, false] },
          //   { text: '', border: [false, false, false, false] },
          //   { text: '', border: [false, false, false, false] },
          //   { text: 'IVA', style: 'labelQuantityTotal' },
          //   { text: 's666df', style: 'labelQuantityTotal' }
          // ],
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: 'TOTAL', style: 'labelQuantityTotal' },
            { text: `${numeral(totalGral).format('$0,0.00')}`, style: 'labelQuantityTotal' }
          ]
        ]
      }
    };
  }

  private getInvoiceDetailObject(dataInvoice: any, dataPO: any) {
    let subTotalGral = 0;
    let totalGral = 0;
    for (const item of dataInvoice) {
      subTotalGral = numeral(subTotalGral).value() + numeral(item.subTotal).value();
      totalGral = numeral(totalGral).value() + numeral(item.total).value();
    }

    let subTotalPO = 0;
    let totalPO = 0;
    for (const item of dataPO) {
      subTotalPO = numeral(subTotalPO).value() + numeral(item.subTotal).value();
      totalPO = numeral(totalPO).value() + numeral(item.total).value();
    }
    let quantityTotal: any = 0;
    const headerTitle: any = [{ colSpan: 4, text: 'FACTURACIÓN', fillColor: '#DBDBDB', style: 'labelProducts' },
    {}, {}, {}];
    const headers: any = [
      { text: 'QTY', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO UNITARIO', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO TOTAL', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'Remark', fillColor: '#FFFF99', style: 'tableHeaderCenter' }
    ];

    return {
      margin: [-11, -12, 0, 0],
      table: {
        headerRows: 2,
        widths: [18, 50, 50, 35],
        body: [
          headerTitle,
          headers,
          ...dataInvoice.map((o, index) => {
            quantityTotal = quantityTotal + o.quantity;
            return [
              { text: o.quantity, style: 'tableItemCenter' },
              { text: `${numeral(o.unitPrice).format('$0,0.0000')}`, style: 'tableItemRight' },
              { text: `${numeral(o.subTotal).format('$0,0.0000')}`, style: 'tableItemRight' },
              { text: `${(o.remarck) ? 'VERDADERO' : 'FALSO'}`, style: 'tableHeaderCenter' }
            ];
          }),
          [
            { text: `${quantityTotal}`, style: 'labelQuantityTotalCenter' },
            { text: 'SUBTOTAL', style: 'labelQuantityTotal' },
            { text: `${numeral(subTotalGral).format('$0,0.00')}`, style: 'labelQuantityTotal' },
            { text: `${(numeral(subTotalGral).format('$0,0.00') == numeral(subTotalPO).format('$0,0.00')) ? 'VERDADERO' : 'FALSO'}`, style: 'tableHeaderCenter' }
          ],
          // [
          //   { text: '', border: [false, false, false, false] },
          //   { text: 'IVA', style: 'labelQuantityTotal' },
          //   { text: '$61.55', style: 'labelQuantityTotal' },
          //   { text: 'FALSO', style: 'labelQuantityTotal' }
          // ],
          [
            { text: '', border: [false, false, false, false] },
            { text: 'TOTAL', style: 'labelQuantityTotal' },
            { text: `${numeral(totalGral).format('$0,0.00')}`, style: 'labelQuantityTotal' },
            { text: `${(numeral(totalGral).format('$0,0.00') == numeral(totalPO).format('$0,0.00')) ? 'VERDADERO' : 'FALSO'}`, style: 'tableHeaderCenter' }
          ]

        ]
      }
    };
  }

  private getWaterMark(dataParent) {
    if (dataParent.reconciliationStatusId === ReconciliationStatus.Cancelled) {
      return {
        text: 'CANCELADA', color: 'red', opacity: 0.3
      }
    } else {
      return {
        text: ''
      }
    }
  }

  getHistoryAuthorization(dataParent, listAuthorization, listAuthorizers, logoKR) {
    const authorizedStatus = AuthorizationStatus.Authorized;
    const size = listAuthorization.length;
    let headerTable: any = [];
    headerTable.push({ text: 'SOLICITANTE', style: 'tableLabelCenter' });
    listAuthorizers.map((a) => {
      headerTable.push({ text: 'AUTORIZÓ', style: 'tableLabelCenter' });
    });

    let bodyImages: any = [];
    // statusId
    if (dataParent.reconciliationStatusId != ReconciliationStatus.Rejected && dataParent.reconciliationStatusId != ReconciliationStatus.Created) {
      bodyImages.push({ image: `${logoKR}`, style: 'tableLabelCenter', width: 20, height: 15, border: [true, false, true, false] });
    } else {
      bodyImages.push({ text: '', style: 'boxBodyImages', border: [true, false, true, false] });
    }

    let authorization = false;
    listAuthorizers.map((authorizer) => {
      listAuthorization.map((a) => {
        if (a.authorizationStatusId == authorizedStatus && authorizer.id == a.authorizerId) {
          bodyImages.push({ image: `${logoKR}`, style: 'tableLabelCenter', width: 20, height: 15, border: [true, false, true, false] });
          authorization = true;
        }
      });

      if (!authorization) {
        bodyImages.push({ text: '', style: 'boxBodyImages', border: [false, false, true, false] });
      }
      authorization = false;
    });


    let bodyNames: any = [];
    bodyNames.push({ text: `${dataParent.createBy}`, style: 'boxAuthorization', border: [true, false, true, true] });
    listAuthorizers.map((a) => {
      bodyNames.push({ text: `${a.fullName}`, style: 'boxAuthorization', border: [true, false, true, true] });
    });

    return {
      height: 20, style: 'tableAuthorizationRight', table: {
        widths: [31, 30, 30, 30],
        body: [
          headerTable,
          bodyImages,
          bodyNames
        ]
      },
    };
  }

  /**
  * Fin Construccion de PDF
  */

}
