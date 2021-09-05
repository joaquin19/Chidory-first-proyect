export interface RequisitionHeader {
  id: number;
  folio: string;
  requisitionTypeId: number;
  requisitionTypeName: string;
  supplierId: number;
  supplierName: string;
  businessUnitId: number;
  businessUnitName: string;
  costCenterId: number;
  costCenterName: string;
  statusId: number;
  statusName: string;
  currencyId: number;
  currencyName: string;
  dateOrder: string;
  subTotal: number;
  taxes: number;
  total: number;
  detail: any;
  createBy: string;
  createdOn: string;
}
