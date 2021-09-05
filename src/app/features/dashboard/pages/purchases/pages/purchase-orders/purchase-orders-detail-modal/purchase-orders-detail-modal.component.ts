import { Component, OnInit } from '@angular/core';
import { TaxService } from '@app/features/dashboard/pages/catalogs/services/tax.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';
import { PurchaseOrderHeaderService } from '../../../services';
import { PurchaseOrderDetailService } from '../../../services/purchase-order-detail.service';
import { PurchaseOrderDetailTaxService } from '../../../services/purchase-order-detail-tax.service';
import { PurchaseOrderDocumentService } from '../../../services/purchase-order-document.service';
import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { LocalImagesService } from '@app/shared/services/local-images.service';
import { AuthorizerService } from '@app/features/dashboard/pages/catalogs/services/authorizer.service';

@Component({
  selector: 'app-purchase-orders-detail-modal',
  templateUrl: './purchase-orders-detail-modal.component.html',
  styleUrls: ['./purchase-orders-detail-modal.component.scss']
})
export class PurchaseOrdersDetailModalComponent implements OnInit {

  public data: any;
  public purchaseOrder: any;
  public listPurchaseOrderDetail: any;
  public listPurchaseOrderDocuments: any;
  public listTaxesDetail: any;
  public listTaxesAdded: any;
  public listTaxes: any;
  public headers: any;
  public observations: string;
  public requiredObservation: boolean;
  public authorizationStatusAuthorized: AuthorizationStatus;
  public authorizationStatusReject: AuthorizationStatus;
  public authorizationStatusId: AuthorizationStatus;
  public currentUser: any;
  public total: any;
  public subTotal: any;
  public quantity: any;
  public logo: any;
  public logoKR: any;
  public responsiveOptions: any;
  public processTypeId = ProcessType.PurchaseOrder;
  public listAuthorization: any;
  public listAuthorizers: any;
  public authorizedStatus: AuthorizationStatus.Authorized;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private purchaseOrderHeaderService: PurchaseOrderHeaderService,
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    private purchaseOrderDocumentService: PurchaseOrderDocumentService,
    private purchaseOrderDetailTaxService: PurchaseOrderDetailTaxService,
    private taxService: TaxService,
    private toastr: ToastrService,
    private authorizationProcessService: AuthorizationProcessService,
    private localImagesService: LocalImagesService,
    private authorizerService: AuthorizerService
  ) {
    this.data = {};
    this.purchaseOrder = {};
    this.listPurchaseOrderDetail = [];
    this.listPurchaseOrderDocuments = [];
    this.headers = [];
    this.observations = '';
    this.authorizationStatusAuthorized = AuthorizationStatus.Authorized;
    this.authorizationStatusReject = AuthorizationStatus.Rejected;
    this.authorizationStatusId = AuthorizationStatus.None;
    this.total = 0;
    this.subTotal = 0;
    this.quantity = 0;
    this.logo = '';
    this.logoKR = '';
    this.listAuthorization = [];
    this.listAuthorizers = [];

    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
      { breakpoint: '768px', numVisible: 2, numScroll: 2 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headers = [
      { field: 'code', header: 'NO. PARTE', width: 'col-w md' },
      { field: 'description', header: 'DESCRIPCIÓN', width: 'col-w xxxxl' },
      { field: 'quantity', header: 'CANTIDAD', width: 'col-w md', format: FormatColumn.Quantity },
      { field: 'unitMeasureName', header: 'U/M', width: 'col-w md' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', width: 'col-w lg', format: FormatColumn.Currency },
      { field: 'subTotal', header: 'PRECIO TOTAL', width: 'col-w md', format: FormatColumn.Currency }
    ];

    this.showForm();
  }

  showForm() {
    this.data = this.config.data;
    this.getPurchaseOrderById(this.data.id);
    this.getPurchaseOrderDocuments(this.data.id);
    this.getLogo();
    this.getLogoKR();
    this.getAuthorizers();
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
        this.getPurchaseOrderDetail(this.purchaseOrder.id);
        this.getAuthorizations(this.purchaseOrder.id);
      });
  }

  getPurchaseOrderDetail(purchaseOrderHeaderId) {
    this.purchaseOrderDetailService.getPurchaseOrderDetailByHeaderId(purchaseOrderHeaderId).subscribe(
      data => {
        this.listPurchaseOrderDetail = data;
        this.getPurchaseOrderDetailTaxByHeader(purchaseOrderHeaderId);
      }, error => {
        this.toastr.error(error.message);
      });
  }

  getPurchaseOrderDetailTaxByHeader(purchaseOrderId) {
    this.purchaseOrderDetailTaxService.getPurchaseOrderDetailTaxByPOH(purchaseOrderId).subscribe(
      data => {
        this.listTaxesDetail = data;
        this.getTaxes();
      });
  }

  getTaxes() {
    this.taxService.getTaxes().subscribe(
      data => {
        this.listTaxes = data;
        for (const item of this.listTaxes) {
          item.amount = 0;
        }
        this.calculationTotal();
      });
  }

  calculationTotal() {
    this.total = 0;
    this.subTotal = 0;
    for (const item of this.listPurchaseOrderDetail) {
      this.subTotal = this.subTotal + item.subTotal;
      this.total = this.total + item.total;
      this.quantity = this.quantity + item.quantity;
    }
    this.calculationTaxes();
  }

  calculationTaxes() {
    for (const itemT of this.listTaxes) {
      itemT.amount = 0;
    }
    for (const itemD of this.listTaxesDetail) {
      for (const itemT of this.listTaxes) {
        if (itemD.taxId === itemT.id) {
          itemT.amount = itemT.amount + itemD.amount;
        }
      }
    }
    this.listTaxesAdded = this.listTaxes.filter(({ id }) => this.listTaxesDetail.some(o => o.taxId === id));
  }

  closeForm(resp): void {
    this.ref.close(resp);
  }

  downloadPDF() {
    const dateCreateOn = (moment(`${this.purchaseOrder.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const purchaseOrderNamePDF = `P${this.purchaseOrder.id}(${this.purchaseOrder.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.purchaseOrderHeaderService.getDocumentDefinition(this.headers, this.listPurchaseOrderDetail,
        this.purchaseOrder, this.listTaxesAdded, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
    pdfMake.createPdf(documentDefinition).download(purchaseOrderNamePDF);
  }

  showPDF() {
    const documentDefinition =
      this.purchaseOrderHeaderService.getDocumentDefinition(this.headers, this.listPurchaseOrderDetail,
        this.purchaseOrder, this.listTaxesAdded, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
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

  getLogoKR() {
    this.localImagesService.getLogoKR().subscribe(res => {
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(res);
      reader.onloadend = () => {
        this.logoKR = reader.result;
      }
    });
  }

  getPurchaseOrderDocuments(purchaseOrderId) {
    this.purchaseOrderDocumentService.getPurchaseOrderDocumentsByHeaderId(purchaseOrderId).subscribe(
      data => {
        this.listPurchaseOrderDocuments = data;
      });
  }

  downloadDocument(document) {
    this.purchaseOrderDocumentService.downloadPurchaseOrderDocument(document).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${document.userName}`);
      });
  }

  getAuthorizations(purchaseOrderId) {
    console.log('purchaseOrderId: ', purchaseOrderId);
    this.authorizationProcessService.getAuthorizations(this.processTypeId, null, this.authorizedStatus, purchaseOrderId).subscribe(
      data => {
        this.listAuthorization = data;
      });
  }

  getAuthorizers() {
    this.authorizerService.getAuthorizerByProcessTypeId(this.processTypeId).subscribe(
      data => {
        this.listAuthorizers = data;
      });
  }

}
