import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as numeral from 'numeral';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { UrlApiUtil } from '@app/core/utils/api-url-util';
import { PurchaseOrderHeader } from '../models';
import { PurchaseOrderType } from '@app/shared/enums/purchaseOrderType';
import { AuthorizationStatus, PurchaseOrderStatus } from '@app/shared/enums';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderHeaderService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `${UrlApiUtil.getApiUrl()}purchaseOrderHeader`;
  }

  getPurchaseOrders(userName): Observable<PurchaseOrderHeader[]> {
    return this.http.get<PurchaseOrderHeader[]>(`${this.endpoint}/getPurchaseOrders?userName=${userName}`);
  }

  getPurchaseOrderById(purchaseOrderId): Observable<PurchaseOrderHeader> {
    return this.http.get<PurchaseOrderHeader>(`${this.endpoint}/getPurchaseOrderById?purchaseOrderId=${purchaseOrderId}`);
  }

  getAuthorizationRequisitions(purchaseOrderId, userName): Observable<PurchaseOrderHeader> {
    return this.http.get<PurchaseOrderHeader>(`${this.endpoint}/getAuthorizationRequisitions?purchaseOrderId=${purchaseOrderId}&userName=${userName}`);
  }

  getPurchaseOrdersNoReconciliation(userName): Observable<PurchaseOrderHeader[]> {
    return this.http.get<PurchaseOrderHeader[]>(`${this.endpoint}/getPurchaseOrdersNoReconciliation?userName=${userName}`);
  }

  savePurchaseOrder(form: FormData): Observable<PurchaseOrderHeader> {
    return this.http.post<PurchaseOrderHeader>(`${this.endpoint}/savePurchaseOrder`, form);
  }

  updatePurchaseOrder(form: FormData): Observable<PurchaseOrderHeader> {
    return this.http.post<PurchaseOrderHeader>(`${this.endpoint}/updatePurchaseOrder`, form);
  }

  updatePurchaseOrderSendAuthorization(purchaseOrderSave): Observable<PurchaseOrderHeader> {
    return this.http.put<PurchaseOrderHeader>(`${this.endpoint}/updatePurchaseOrderSendAuthorization`, purchaseOrderSave);
  }

  updatePurchaseOrdersAuthorize(purchaseOrderSave): Observable<PurchaseOrderHeader> {
    return this.http.post<PurchaseOrderHeader>(`${this.endpoint}/updatePurchaseOrdersAuthorize`, purchaseOrderSave);
  }

  updatePurchaseOrdersReject(purchaseOrderSave): Observable<PurchaseOrderHeader> {
    return this.http.post<PurchaseOrderHeader>(`${this.endpoint}/updatePurchaseOrdersReject`, purchaseOrderSave);
  }

  deletePurchaseOrder(purchaseOrderId, deleteBy): Observable<PurchaseOrderHeader> {
    return this.http.delete<PurchaseOrderHeader>(`${this.endpoint}/deletePurchaseOrder?purchaseOrderId=${purchaseOrderId}&deleteBy=${deleteBy}`);
  }

  /**
   * Construccion de PDF
   */

  getDocumentDefinition(cols: any, data: any, dataParent: any, taxes: any, logo: any, listAuthorization: any, listAuthorizers: any, logoKR: any) {
    const purchaseOrderType = PurchaseOrderType;
    const plantName = (dataParent.plantName == null) ? '' : dataParent.plantName;
    const lastPeriod = (dataParent.lastPeriodStart == null) ? '' : `${moment(`${dataParent.lastPeriodStart}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}-${moment(`${dataParent.lastPeriodEnd}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}`;
    const period = (dataParent.startPeriod === '') ? '' : `${moment(`${dataParent.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}-${moment(`${dataParent.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}`;
    const lastTotal = (dataParent.lastPeriodStart == null) ? '' : `${numeral(dataParent.lastTotal).format('$0,0.0000')}`;
    const lastCurrencyCode = (dataParent.lastPeriodStart == null) ? '' : dataParent.lastCurrencyCode;
    return {
      pageSize: 'A4',
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
            text: `${dataParent.createdOn} - Folio: ${dataParent.folio}`,
            style: 'labelHeaderPagin'
          }
        ]
      },
      watermark: this.getWaterMark(dataParent),
      content: [
        {
          columns: [
            [
              {
                text: `${dataParent.businessUnitName} (${dataParent.costCenterName})`,
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
              },
              {
                height: 20,
                text: 'ORDEN DE COMPRA',
                style: 'labelPO'
              },
            ],
            [
              this.getHistoryAuthorization(dataParent, listAuthorization, listAuthorizers, logoKR),
              {
                text: '',
                style: 'spaceSection'
              },
              {
                style: 'tableRight', table: {
                  widths: [60, 60],
                  body: [
                    [
                      { text: 'PLANTA', color: 'blue', fillColor: '#DBDBDB', style: 'labelFolioLeft' },
                      { text: `${plantName}`, style: 'labelFolioRight' }
                    ],
                    [
                      { text: 'NO. FOLIO', color: 'blue', fillColor: '#DBDBDB', style: 'labelFolioLeft' },
                      { text: `${dataParent.folio}`, style: 'labelFolioRight' }
                    ],
                    [
                      { text: 'FECHA', color: 'blue', fillColor: '#DBDBDB', style: 'labelFolioLeft' },
                      { text: `${moment(`${dataParent.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}`, style: 'labelFolioRight' }
                    ],
                    [
                      { text: 'NO. PROV.', color: 'blue', fillColor: '#DBDBDB', style: 'labelFolioLeft' },
                      { text: `${dataParent.supplierId}`, style: 'labelFolioRight' }
                    ],
                    [
                      { text: 'NO. FACTURA', color: 'blue', fillColor: '#DBDBDB', style: 'labelFolioLeft' },
                      { text: '', style: 'labelFolioRight' }
                    ]
                  ]
                },
              }
            ]
          ]
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
                    { text: 'FECHA REQUERIDA', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${moment(`${dataParent.estimatedDate}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}`, style: 'tableItemCenter' }
                  ],
                  [
                    { text: 'CONTACTO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.supplierContactName === null ? '' : dataParent.supplierContactName}`, style: 'tableItemCenter' },
                    { text: 'CONDICIONES DE PAGO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.supplierPaymentTermName}`, style: 'tableItemCenter' }
                  ],
                  [
                    { text: 'TEL.', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.supplierPhone}`, style: 'tableItemCenter' },
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
        this.getPeriodSection(dataParent, period, purchaseOrderType),
        {
          text: '',
          style: 'spaceSection'
        },
        this.getDetailObject(cols, data, dataParent),
        {
          text: '',
          margin: [0, 3, 0, 0]
        },
        this.getTotalObject(cols, data, dataParent, taxes),
        {
          text: '',
          style: 'spaceSection'
        },
        {
          columns: [
            {
              width: 'auto', height: 20, table: {
                widths: [100, 388],
                body: [
                  [
                    { text: 'NOTA', style: 'tableHeaderLeft', fillColor: '#FF8B8B' },
                    { text: `${dataParent.notes}`, style: 'tableHeaderLeft' }
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
                    { text: 'OBSERVACIÓN (MATERIAL/CALIDAD)', fillColor: '#DBDBDB', style: 'tableHeaderLeft' },
                    { text: `${dataParent.observations}`, style: 'tableHeaderLeft' }
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
              margin: [55, 0, 0, 0],
              width: 'auto',
              height: 20,
              table: {
                widths: [90, 90, 90, 90],
                body: [
                  [
                    { text: 'MATERIAL', rowSpan: 6, style: 'boxes' },
                    { text: 'CALIDAD', rowSpan: 6, style: 'boxes' },
                    { text: 'FECHA', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                  [
                    {}, {},
                    { text: 'RECIBIÓ', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                  [
                    {}, {},
                    { text: 'QTY', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                  [
                    {}, {},
                    { text: 'ALMACÉN', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                  [
                    {}, {},
                    { text: 'LOTE', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                  [
                    {}, {},
                    { text: 'No FACTURA', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                ]
              }
            }
          ]
        },
      ],
      styles: {
        nameCompany: { bold: true, fontSize: 15, color: 'black', alignment: 'left', margin: [0, 5, 0, 0] },
        labelFolioRight: { fontSize: 7, color: 'black', alignment: 'right' },
        labelFolioLeft: { fontSize: 7, color: 'black', alignment: 'left' },
        labelHeader: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldHeader: { fontSize: 10, color: 'black', alignment: 'center' },
        tableHeaderCenter: { bold: true, fontSize: 9, color: 'black', alignment: 'center' },
        tableHeaderRight: { bold: true, fontSize: 9, color: 'black', alignment: 'right' },
        tableHeaderLeft: { bold: true, fontSize: 9, color: 'black', alignment: 'left' },
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
    if (dataParent.statusId === PurchaseOrderStatus.Cancelled) {
      return {
        text: 'CANCELADA', color: 'red', opacity: 0.3
      }
    } else {
      return {
        text: ''
      }
    }
  }

  private getPeriodSection(dataParent, period, purchaseOrderType) {
    const previousAmount = (dataParent.previousAmount == null) ? '' : dataParent.previousAmount;
    if (dataParent.purchaseOrderTypeId == purchaseOrderType.StandardProjectCustomer) {
      return {
        columns: [
          {
            width: 120, height: 20, style: { alignment: 'right' }, table: {
              widths: [50, 50, 40, 52, 100, 160],
              body: [
                [
                  { text: 'PERIODO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                  { text: `${period}`, style: 'tableItemCenter' },
                  { text: 'PROYECTO CLIENTE', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                  { text: `${dataParent.projectName}`, style: 'tableItemCenter' },
                  { text: 'MONTO ANTERIOR', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                  { text: `${previousAmount}`, style: 'tableItemCenter' }
                ],
              ]
            }
          }
        ]
      }
    } else {
      return {
        columns: [
          {
            width: 120, height: 20, style: { alignment: 'right' }, table: {
              widths: [50, 160, 100, 160],
              body: [
                [
                  { text: 'PERIODO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                  { text: `${period}`, style: 'tableItemCenter' },
                  { text: 'MONTO ANTERIOR', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                  { text: `${previousAmount}`, style: 'tableItemCenter' }
                ],
              ]
            }
          }
        ]
      };
    }
  }

  private getDetailObject(cols: any, data: any, dataParent: any) {

    let quantityTotal: any = 0;
    const headerTitle: any = [{ colSpan: 9, text: 'PRODUCTOS REQUERIDOS', fillColor: '#DBDBDB', style: 'labelProducts' },
    {}, {}, {}, {}, {}, {}, {}, {}];
    const headers: any = [
      { text: 'No.', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'NO. PARTE', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'DESCRIPCIÓN', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'DIMENSIÓN ó PROYECTO', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'CLIENTE', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'CANTIDAD', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'U/M', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO UNITARIO', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO TOTAL', fillColor: '#FFFF99', style: 'tableHeaderCenter' }
    ];

    return {
      columns: [
        {
          table: {
            headerRows: 2,
            widths: [15, 30, 100, 49, 38, 44, 38, 50, 60],
            body: [
              headerTitle,
              headers,
              ...data.map((o, index) => {
                quantityTotal = quantityTotal + o.quantity;
                if (dataParent.purchaseOrderTypeId == PurchaseOrderType.StandardProjectCustomer) {
                  return [
                    { text: index + 1, style: 'tableItemCenter' },
                    { text: o.code, style: 'tableItemCenter' },
                    { text: o.articleName, style: 'tableItemCenter' },
                    { text: o.projectName, style: 'tableItemCenter' },
                    { text: o.customerName, style: 'tableItemCenter' },
                    { text: o.quantity, style: 'tableItemCenter' },
                    { text: o.unitMeasureName, style: 'tableItemCenter' },
                    { text: `${numeral(o.unitPrice).format('$0,0.0000')}`, style: 'tableItemRight' },
                    { text: `${numeral(o.subTotal).format('$0,0.0000')}`, style: 'tableItemRight' }
                  ];
                } else {
                  return [
                    { text: index + 1, style: 'tableItemCenter' },
                    { text: o.code, style: 'tableItemCenter' },
                    { text: o.articleName, style: 'tableItemCenter' },
                    { text: o.dimension, style: 'tableItemCenter' },
                    { text: '', style: 'tableItemCenter' },
                    { text: o.quantity, style: 'tableItemCenter' },
                    { text: o.unitMeasureName, style: 'tableItemCenter' },
                    { text: `${numeral(o.unitPrice).format('$0,0.0000')}`, style: 'tableItemRight' },
                    { text: `${numeral(o.subTotal).format('$0,0.0000')}`, style: 'tableItemRight' }
                  ];
                }
              }),
              [
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { colSpan: 2, text: 'Total cantidad:', style: 'labelQuantityTotal' },
                { text: '', border: [false, false, false, false] },
                { text: `${quantityTotal}`, style: 'tableItemCenter', },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
              ]
            ]
          }
        }
      ]
    }
  }

  private getTotalObject(cols: any, data: any, dataParent: any, taxes: any) {
    let subTotalGral = 0;
    let totalGral = 0;
    for (const item of data) {
      subTotalGral = numeral(subTotalGral).value() + numeral(item.subTotal).value();
      totalGral = numeral(totalGral).value() + numeral(item.total).value();
    }
    return {
      columns: [
        {
          table: {
            unbreakable: true,
            headerRows: 0,
            widths: [15, 30, 100, 49, 38, 44, 38, 50, 60],
            body: [
              [
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: 'SUB TOTAL:', fillColor: '#DBDBDB', style: 'labelSubTotal' },
                { colSpan: 2, text: `${numeral(subTotalGral).format('$0,0.00')}`, style: 'fieldSubTotal' },
                { text: '', border: [false, false, false, false] }
              ],
              ...taxes.map((t, indexT) => {
                return [
                  { text: '', border: [false, false, false, false] },
                  { text: '', border: [false, false, false, false] },
                  { text: '', border: [false, false, false, false] },
                  { text: '', border: [false, false, false, false] },
                  { text: '', border: [false, false, false, false] },
                  { text: '', border: [false, false, false, false] },
                  { text: `${t.name}`, fillColor: '#DBDBDB', style: 'labelSubTotal' },
                  { colSpan: 2, text: `${numeral(t.amount).format('$0,0.00')}`, style: 'fieldSubTotal' },
                  { text: '' }
                ];
              }),
              [
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: '', border: [false, false, false, false] },
                { text: 'TOTAL:', fillColor: '#DBDBDB', style: 'labelTotal' },
                { colSpan: 2, text: `${dataParent.currencyCode} ${numeral(totalGral).format('$0,0.00')}`, style: 'fieldTotal' },
                { text: '' }
              ]
            ]
          }
        }
      ]
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
    if (dataParent.statusId != PurchaseOrderStatus.Rejected && dataParent.statusId != PurchaseOrderStatus.Created) {
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
