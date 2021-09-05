export interface RequisitionDetail {
    id: number;
    requisitionHeaderId: number;
    articleId: number;
    code: string;
    name: string;
    description: string;
    unitPrice: number;
    dimension: number;
    quantity: number;
    subTotal: number;
    total: number;
    estimatedDate: string;
}
