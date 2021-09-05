export interface ExportProduct {
  id: number;
  customerId: number;
  customerName: string;
  currencyId: number;
  currencyName: string;
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
  hsCode_CD: string;
  material: string;
  division: string;
  qaInspection: string;
  createBy: string;
  createOn: string;
}