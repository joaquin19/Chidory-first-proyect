export interface OrderHeader {
  id: number;
  folio: string;
  orderTypeId: number;
  orderTypeName: string;
  customerId: number;
  customerName: string;
  customerLegalName: string;
  projectId: number;
  projectName: string;
  priceHeaderId: number;
  orderStatusId: number;
  orderStatusName: string;
  address: string;
  shippingAddress: string;
  shippingDate: string;
  noOrder: number;
  customerCustomName: string;
  noOrderCustomer: number;
  tarima: string;
  totalPieces: number;
  createBy: string;
  createdOn: string;
  name: string;
  code: number;
}
