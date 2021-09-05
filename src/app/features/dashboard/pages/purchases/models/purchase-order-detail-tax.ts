export interface PurchaseOrderDetailTax {
  id: number;
  purchaseOrderDetailId: number;
  articleId: number;
  taxId: number;
  taxName: string;
  valuePercentage: number;
  amount: number;
  createBy: string;
  createOn: string;
}
