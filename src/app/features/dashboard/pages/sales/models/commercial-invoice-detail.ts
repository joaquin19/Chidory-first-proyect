export interface CommercialInvoiceDetail {
    id: number;
    commercialInvoiceHeaderId: number;
    packingListHeaderId: number;
    partNumber: string;
    partDescription: string;
    hsCode: string;
    material: string;
    division: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}
