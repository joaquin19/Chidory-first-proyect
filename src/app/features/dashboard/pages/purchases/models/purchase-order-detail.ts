export interface PurchaseOrderDetail {
  id: number;
  unitMeasureId: number;
  unitMeasureName: string;
  articleId: number;
  articleName: string;
  proyectId: number;
  proyectName: string;
  customerId: number;
  customerName: string;
  code: string;
  name: string;
  fullName: string;
  descripcion: string;
  unitPrice: number;
  dimension: number;
  quantity: number;
  subTotal: number;
  total: number;
  createBy: string;
  createdOn: string;
}
