export interface SaleSupportHeader {
  id: number;
  folio: string;
  customerId: number;
  customerName: string;
  customerLegalName: string;
  statusId: number;
  statusName: string;
  projectId: number;
  projectName: string;
  currencyId: number;
  currencyCode: string;
  currencyName: string;
  lastCurrencyCode: string;
  startDate: string;
  endDate: string;
  taxes: number;
  subTotal: number;
  total: number;
  purchaseOrder: string;
  carModel: string;
  createBy: string;
  createdOn: string;
}