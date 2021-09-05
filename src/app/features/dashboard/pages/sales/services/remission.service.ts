import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlApiUtil } from '@app/core/utils/api-url-util';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemissionService {

  private endpoint: string;
  private endPointRemission: string;
  private endPointRemissionType: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `OrderHeader`;
    this.endPointRemission = `OrderDetail`;
    this.endPointRemissionType = `RemissionType`;
  }

  getRemissions(userName): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/GetOrders?userName=${userName}`);
  }

  getOrderById(orderId): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/GetOrderById?orderId=${orderId}`);
  }

  getRemissionType(): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endPointRemissionType}/GetRemissionType`);
  }

  getOrdersByCustomerId(customerId, currencyId, startDate, endDate, saleSupportHeaderId): Observable<any> {
    return this.http.get<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/getOrdersByCustomerId?customerId=${customerId}`
      + `&currencyId=${currencyId}&startDate=${startDate}&endDate=${endDate}&saleSupportHeaderId=${saleSupportHeaderId}`);
  }

  saveOrder(form: FormData): Observable<any> {
    return this.http.post<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/SaveOrder`, form);
  }

  updateOrder(form: FormData): Observable<any> {
    return this.http.put<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/UpdateOrder`, form);
  }

  deleteOrder(orderId, deleteBy): Observable<any> {
    return this.http.delete<any[]>(`${UrlApiUtil.getApiUrl()}${this.endpoint}/DeleteOrder?orderId=${orderId}&deleteBy=${deleteBy}`);
  }

  getOrderDetailByHeaderId(orderHeaderId): Observable<any> {
    return this.http.get<any[]>(
      `${UrlApiUtil.getApiUrl()}${this.endPointRemission}/GetOrderDetailByHeaderId?orderHeaderId=${orderHeaderId}`);
  }

  getDocumentDefinition(cols: any, data: any, dataParent: any, logo: any) {
    const plantName = (dataParent.plantName == null) ? '' : dataParent.plantName;
    const day = `${moment(`${dataParent.createdOn}`, 'DD-MM-YYYY').format('DD')}`;
    const month = `${moment(`${dataParent.createdOn}`, 'DD-MM-YYYY').format('MM')}`;
    const year = `${moment(`${dataParent.createdOn}`, 'DD-MM-YYYY').format('YYYY')}`;
    const today = new Date().toLocaleString();
    return {
      header: (currentPage) => {
        if (currentPage > 1) {
          return [
            {

            }
          ];
        }
      },
      content: [
        {
          columns: [
            [
              {
                columns: [
                  {
                    image: `${logo}`,
                    width: 90,
                    height: 25
                  }
                ]
              }
            ],
            [
              {
                width: 500,
                text: 'KRAEM, S.A. DE C.V.',
                style: 'nameCompany'
              },
              {
                width: 500,
                text: 'AV. Industrial 560, Parque Industrail FINSA',
                style: 'tableHeaderCenter'
              },
              {
                width: 500,
                text: 'Guadalupe, Nuevo León, C.P. 67132',
                style: 'tableHeaderCenter'
              },
              {
                width: 500,
                text: 'TEL. 8145-3868, 81453599, 81453715',
                style: 'tableHeaderCenter'
              },
              {
                width: 500,
                text: 'R.F.C. KRA-061027-MT5',
                style: 'labelFRC'
              },
            ],
            [
              {
                height: 20, style: 'tableAuthorizationRight',
                table: {
                  widths: [80],
                  body: [
                    [
                      { text: 'REMISION (REMISSION)', style: 'labelRemission' }
                    ],
                    [
                      { text: `${dataParent.folio}`, style: 'labelFolio' }
                    ],
                    [
                      { text: 'FECHA', style: 'tableLabelCenter' }
                    ],
                    [
                      [
                        {
                          table: {
                            widths: [17, 17, 30],
                            height: 5,
                            body: [
                              [
                                { text: `${day}`, style: 'labelDate' },
                                { text: `${month}`, style: 'labelDate' },
                                { text: `${year}`, style: 'labelDate' }
                              ],
                              [
                                { text: 'DIA', style: 'boxDate' },
                                { text: 'MES', style: 'boxDate' },
                                { text: 'AÑO', style: 'boxDate' }
                              ]
                            ]
                          },
                          layout: 'noBorders'
                        }
                      ]
                    ]
                  ]
                }
              }
            ]
          ]
        },
        {
          text: '',
          style: 'spaceSection'
        },
        {
          table: {
            widths: [80, 318, 80],
            body: [
              [
                {
                  border: [true, true, false, false],
                  text: 'Client (Customer)'
                },
                {
                  border: [false, true, false, true],
                  text: `${dataParent.customerCustomName}`
                },
                {
                  border: [false, true, true, false],
                  text: ''
                }
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Dirección (Address)'
                },
                {
                  border: [false, false, false, true],
                  text: `${dataParent.address}`
                },
                {
                  border: [false, false, true, false],
                  text: ''
                }
              ],
              [
                {
                  border: [true, false, false, false],
                  text: ''
                },
                {
                  border: undefined,
                  text: `ENTREGAR EN: ${dataParent.shippingAddress}`,
                  style: 'labelEntregarEn'
                },
                {
                  border: [false, false, true, false],
                  text: ''
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  fillColor: '#dddddd',
                  text: 'PO Customer'
                },
                '',
                {
                  border: [false, false, true, false],
                  fillColor: '#dddddd',
                  text: 'No. Orden'
                }
              ],
              [
                {
                  border: [true, false, false, true],
                  text: `${dataParent.noOrderCustomer}`
                },
                {
                  border: [false, false, false, true],
                  text: ''
                },
                {
                  border: [false, false, true, true],
                  text: `${dataParent.noOrder}`
                }
              ]
            ]
          },
          layout: {
            defaultBorder: false,
          }
        },
        {
          text: '',
          style: 'spaceSection'
        },
        this.getDetailObject(cols, data, dataParent),
        {
          text: '',
          style: 'spaceSection'
        },

      ],
      footer: {
        columns: [
          {
            style: 'labelHeaderPagin',
            table: {
              widths: [20, 50, 200, 200],
              body: [
                [
                  {
                    border: [true, true, false, false],
                    text: '',
                    columns: [
                      {
                        table: {
                          heights: [12],
                          widths: [10],
                          body: [
                            ['']
                          ]
                        }
                      }
                    ]
                  },
                  {
                    border: [false, true, false, false],
                    text: 'Entrada (Enter)'
                  },
                  {
                    border: [false, true, false, false],
                    text: '\n__________________________________'
                  },
                  {
                    border: [false, true, true, false],
                    text: '\n__________________________________'
                  }
                ],
                [
                  {
                    border: [true, false, false, true],
                    text: '',
                    columns: [
                      {
                        table: {
                          heights: [12],
                          widths: [10],
                          body: [
                            ['']
                          ]
                        }
                      }
                    ]
                  },
                  {
                    border: [false, false, false, true],
                    text: 'Salida (Exit)'
                  },
                  {
                    border: [false, false, false, true],
                    text: `Recibió\nNombre y Firma`,
                    style: 'labelFooter'
                  },
                  {
                    border: [false, false, true, true],
                    text: 'Entregó\nNombre y Firma',
                    style: 'labelFooter'
                  }
                ]
              ]
            },
            layout: {
              defaultBorder: false,
            }
          },
          {
            text: `${today}`,
            style: 'labelToday'
          },
        ]
      },
      styles: {
        nameCompany: { bold: true, fontSize: 14, color: '#808000', alignment: 'center', montserrat: true, margin: [0, 5, 0, 0] },
        labelFolio: { fontSize: 9, bold: true, color: 'black', alignment: 'right', margin: [0, 3, 0, 3] },
        labelPOCustomer: { fontSize: 9, color: 'black', montserrat: true },
        tableHeaderCenter: { fontSize: 8, color: 'black', alignment: 'center', margin: [0, 2, 0, 0] },
        tableItemCenter: { fontSize: 8, color: 'black', alignment: 'center' },
        labelFooter: { fontSize: 8, color: 'black', alignment: 'center' },
        tableLabelCenter: { fontSize: 6, color: 'black', alignment: 'center' },
        labelRemission: { fontSize: 7, color: 'black', alignment: 'center', margin: [0, 3, 0, 3] },
        tableAuthorizationRight: { margin: [70, 0, 0, 0] },
        tableAuthorization: { margin: [0, 20, 0, 10] },
        labelFRC: { bold: true, fontSize: 9, color: 'black', alignment: 'center', montserrat: true, margin: [0, 2, 0, 0] },
        labelEntregarEn: { fontSize: 9, color: 'black', alignment: 'left', montserrat: true },
        labelDate: { fontSize: 11, color: 'black', alignment: 'center', montserrat: true, margin: [0, 2, 0, 0] },
        boxAuthorization: { bold: true, fontSize: 5, color: 'black', alignment: 'center', margin: [0, 20, 0, 0] },
        boxDate: { fontSize: 5, color: 'black', alignment: 'center', margin: [0, 0, 0, 0] },
        spaceSection: { margin: [0, 13, 0, 10] },
        labelToday: { fontSize: 7, color: 'black', alignment: 'left', margin: [-100, 0, 500, 0] },
        labelHeaderPagin: { fontSize: 8, color: 'black', alignment: 'center', margin: [50, -50, 0, 0] },
      },
      defaultStyle: {
        columnGap: 10
      }
    };
  }

  private getDetailObject(cols: any, data: any, dataParent: any) {

    const headers: any = [
      { text: 'Cantidad (Quantity)', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'No. Parte (Part Number)', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'Descripción (Description)', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'STD Pack', fillColor: '#FFFF99', style: 'tableHeaderCenter' }
    ];

    return {
      table: {
        headerRows: 1,
        widths: [80, 155, 155, 80],
        body: [
          headers,
          ...data.map((o) => {
            return [
              { text: o.quantity, style: 'tableItemCenter' },
              { text: o.partNumber, style: 'tableItemCenter' },
              { text: o.partName, style: 'tableItemCenter' },
              { text: `${o.stdPack} * ${o.quantity / o.stdPack}`, style: 'tableItemCenter' }
            ];
          })
        ]
      }
    };
  }
}
