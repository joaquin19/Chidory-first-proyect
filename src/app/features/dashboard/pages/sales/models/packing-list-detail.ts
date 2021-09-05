export interface PackingListDetail {
    id: number;
    packingListHeaderId: number;
    pallet: number;
    model: string;
    partNumber: string;
    partDescription: string;
    unitPrice: number;
    widthSize: number;
    lengthSize: number;
    heightSize: number;
    widthSizePacking: number;
    lengthSizePacking: number;
    heightSizePacking: number;
    cmb: number;
    weight: number;
    packingQuantity: number;
    hsCode: string;
    material: string;
    division: string;
    qaInspection: string;
    quantity: number;
    cmbPacking: number;
    boxQuantity: number;
    grossWeight: number;
    measurement: number;
}
