import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MerchandiseReceptionHeaderService } from '../../../services/merchandise-reception-header.service';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { LocalImagesService } from '@app/shared/services/local-images.service';
import { PurchaseOrderHeaderService } from '../../../services';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-merchandise-reception-detail-modal',
  templateUrl: './merchandise-reception-detail-modal.component.html',
  styleUrls: ['./merchandise-reception-detail-modal.component.scss']
})
export class MerchandiseReceptionDetailModalComponent implements OnInit {

  public merchandiseReception: any;
  public merchandiseReceptionDetail: any;
  public merchandiseReceptionDocument: any;
  public logo: any;
  public purchaseOrder: any;

  constructor(
    public ref: DynamicDialogRef,
    private merchandiseReceptionDocumentService: MerchandiseReceptionHeaderService,
    private merchandiseReceptionHeaderService: MerchandiseReceptionHeaderService,
    public config: DynamicDialogConfig,
    private localImagesService: LocalImagesService,
    private purchaseOrderHeaderService: PurchaseOrderHeaderService
  ) {
    this.merchandiseReception = [];
    this.merchandiseReceptionDetail = {
      id: 0,
      merchandiseReceptionHeaderId: 0,
      purchaseOrderHeaderId: 0,
      articleId: 0,
      name: '',
      description: '',
      fullName: '',
      pendingQuantity: 0,
      newPendingQuantity: 0,
      quantity: 0,
      receivedQuantity: 0,
      newReceivedQuantity: 0,
      unitMeasureId: 0,
      unitMeasureName: '',
      unitPrice: 0
    };
    this.merchandiseReceptionDocument = [{
      id: 0,
      path: '',
      merchandiseReceptionHeaderId: 0,
      merchandiseReceptionDetailId: 0,
      systemName: '',
      userName: ''
    }];
    this.logo = '';
    this.purchaseOrder = {};
  }

  ngOnInit(): void {
    this.merchandiseReception = this.config.data;
    this.merchandiseReceptionDetail = this.config.data;
    this.merchandiseReceptionDetail.newPendingQuantity = this.config.data.pendingQuantity;
    this.getPurchaseOrderById(this.merchandiseReception.purchaseOrderHeaderId);
    if (this.merchandiseReception.merchandiseReceptionHeaderId > 0) {
      this.getLogo();
      this.getMerchandiseReceptionDocuments(this.merchandiseReception.merchandiseReceptionHeaderId);
    }
  }

  getMerchandiseReceptionDetailByPOD(): void {
    this.merchandiseReceptionDocumentService.getMerchandiseReceptionDocumentsByMRD(
      this.merchandiseReceptionDetail.merchandiseReceptionHeaderId,
      this.merchandiseReceptionDetail.id).subscribe(
        data => {
          this.merchandiseReceptionDocument = data;
        });
  }

  closeForm(): void {
    this.ref.close();
  }

  downloadPDF() {
    const dateCreateOn = (moment(`${this.merchandiseReception.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const purchaseOrderNamePDF = `RMS${this.merchandiseReception.id}(${this.purchaseOrder.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.merchandiseReceptionHeaderService.getDocumentDefinition(this.merchandiseReceptionDetail,
        this.merchandiseReception, this.logo, this.purchaseOrder, this.merchandiseReceptionDocument);
    pdfMake.createPdf(documentDefinition).download(purchaseOrderNamePDF);
  }

  showPDF() {
    const documentDefinition =
      this.merchandiseReceptionHeaderService.getDocumentDefinition(this.merchandiseReceptionDetail,
        this.merchandiseReception, this.logo, this.purchaseOrder, this.merchandiseReceptionDocument);
    pdfMake.createPdf(documentDefinition).open();
  }

  getLogo() {
    this.localImagesService.getLogo().subscribe(res => {
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(res);
      reader.onloadend = () => {
        this.logo = reader.result;
      }
    });
  }

  getPurchaseOrderById(purchaseOrderId) {
    this.purchaseOrderHeaderService.getPurchaseOrderById(purchaseOrderId).subscribe(
      data => {
        this.purchaseOrder = data;
        this.purchaseOrder.supplierContactName =
          this.purchaseOrder.supplierContactName !== null ? this.purchaseOrder.supplierContactName : '';
        this.purchaseOrder.supplierPhone =
          this.purchaseOrder.supplierPhone !== null ? this.purchaseOrder.supplierPhone : '';
        this.purchaseOrder.notes =
          this.purchaseOrder.notes !== null ? this.purchaseOrder.notes : '';
        this.purchaseOrder.observations =
          this.purchaseOrder.observations !== null ? this.purchaseOrder.observations : '';
        this.purchaseOrder.startPeriod =
          this.purchaseOrder.startPeriod !== null ? moment(`${this.purchaseOrder.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.purchaseOrder.endPeriod =
          this.purchaseOrder.endPeriod !== null ? moment(`${this.purchaseOrder.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.purchaseOrder.period =
          this.purchaseOrder.startPeriod + ' - ' + this.purchaseOrder.endPeriod;
        this.purchaseOrder.currencyFullName =
          this.purchaseOrder.currencyCode + ' - ' + this.purchaseOrder.currencyName;
      });
  }

  getMerchandiseReceptionDocuments(merchandiseReceptionId) {
    this.merchandiseReceptionDocumentService.getMerchandiseReceptionDocumentsByMRH(merchandiseReceptionId).subscribe(
      data => {
        this.merchandiseReceptionDocument = data;
      });
  }

}
