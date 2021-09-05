export interface Invoice {
  operacionId: number;
  base64FacturaPdf: string;
  base64FacturaXml: string;
  facturaUuid: string;
  facturaFolio: string;
  codigoError: string;
  mensajeError: string;
}