export interface SupplierInvoiceDetail {
    id: number;
    supplierInvoiceHeaderId: number;
    quantity: number;
    dateIssue: string;
    subTotal: number;
    total: number;
}
