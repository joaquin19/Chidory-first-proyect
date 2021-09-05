export interface CommercialInvoiceHeader {
    id: number;
    commercialInvoiceStatusId: number;
    commercialInvoiceStatusName: string;
    folio: string;
    companyId: number;
    companyName: string;
    companyLegalName: string;
    customerId: number;
    customerName: string;
    customerLegalName: string;
    invoice: string;
    purchaseOrder: string;
    buyer: string;
    issueDate: string;
    departureDate: string;
    vesselFlight: string;
    from: string;
    to: string;
    notify1: string;
    notify2: string;
    termsDelivery: string;
    createBy: string;
    createdOn: string;
}
