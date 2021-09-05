export interface SaleSupportDetail {
  id: number;
  saleSupportHeaderId: number;
  orderHeaderId: number;
  folio: string;
  shippingDate: string;
  carModel: string;
  carModelDr: string;
  partNumber: string;
  partNumberCustomer: string;
  component: string;
  partName: string;
  quantity: number;
  salePrice: number;
  subTotal: number;
  total: number;
  reference: string;
  observations: string;
}