export interface PackingListHeader {
    id: number;
    packingListStatusId: number;
    packingListStatusName: string;
    folio: string;
    previousId: number;
    companyId: number;
    companyName: string;
    companyLegalName: string;
    customerId: number;
    customerName: string;
    customerLegalName: string;
    invoice: string;
    purchaseOrder: string;
    container: string;
    seal: string;
    buyer: string;
    issueDate: string;
    departureDate: string;
    vesselFlight: string;
    from: string;
    to: string;
    notify1: string;
    notify2: string
}
