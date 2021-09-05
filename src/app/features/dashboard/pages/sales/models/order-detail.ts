export interface OrderDetail {
  id: number;
  folio: string;
  orderHeaderId: number;
  shippingDate: string;
  carModel: string;
  carModelDr: string;
  partNumber: string;
  partNumberCustomer: string;
  component: string;
  partName: string;
  stdPack: number;
  boxes: number;
  quantity: number;
  salePrice: number;
}
