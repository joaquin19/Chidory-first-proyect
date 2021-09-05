export interface Article {
  id: number;
  code: string;
  name: string;
  description: string;
  fullName: string;
  articleTypeId: number;
  articleTypeName: string;
  unitMeasureId: number;
  unitMeasureName: string;
  unitPrice: number;
  dimension: number;
  taxes: any;
}