import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';
import { PurchaseOrderHeaderService, RequisitionDetailService, RequisitionDetailTaxService, RequisitionDocumentService, RequisitionHeaderService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import { PlantService, SupplierRecordService, TaxService } from '@app/features/dashboard/pages/catalogs/services';
import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { LocalImagesService } from '@app/shared/services/local-images.service';
import { AuthorizerService } from '@app/features/dashboard/pages/catalogs/services/authorizer.service';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';

@Component({
  selector: 'app-requisitions-detail-form',
  templateUrl: './requisitions-detail-form.component.html',
  styleUrls: ['./requisitions-detail-form.component.scss']
})
export class RequisitionsDetailFormComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public requisition: any;
  public headersDetail: any;
  public listRequisitionDetail: any;
  public loadingTable: boolean;
  public total: any;
  public subTotal: any;
  public iva: any;
  public quantity: any;
  public listTaxesAdded: any;
  public listTaxes: any;
  public listTaxesDetail: any;
  public logo: any;
  public logoKR: any;
  public processTypeId = ProcessType.Requisition;
  public listAuthorization: any;
  public listAuthorizers: any;
  public authorizedStatus: AuthorizationStatus.Authorized;
  public data: any;

  constructor(
    private toastr: ToastrService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public requisitionHeaderService: RequisitionHeaderService,
    public requisitionDetailService: RequisitionDetailService,
    public requisitionDetailtaxService: RequisitionDetailTaxService,
    public requisitionDocumentService: RequisitionDocumentService,
    public purchaseOrderHeaderService: PurchaseOrderHeaderService,
    public supplierRecordService: SupplierRecordService,
    public plantService: PlantService,
    public requisitionDetailTaxService: RequisitionDetailTaxService,
    public taxService: TaxService,
    public localImagesService: LocalImagesService,
    private authorizerService: AuthorizerService,
    private authorizationProcessService: AuthorizationProcessService
  ) {
    this.requisition = {};
    this.headersDetail = [];
    this.listRequisitionDetail = [];
    this.listTaxesDetail = [];
    this.listTaxesAdded = [];
    this.listTaxes = [];
    this.loadingTable = false;
    this.total = 0;
    this.subTotal = 0;
    this.iva = 0;
    this.quantity = 0;
    this.logo = '';
    this.logoKR = '';
    this.listAuthorization = [];
    this.listAuthorizers = [];
  }

  ngOnInit(): void {
    this.headersDetail = [
      { field: 'code', header: 'NO. PARTE', width: 'col-w md' },
      { field: 'description', header: 'DESCRIPCIÓN', width: 'col-w xxl' },
      { field: 'quantity', header: 'CANTIDAD', width: 'col-w md', format: FormatColumn.Quantity },
      { field: 'unitMeasureName', header: 'U/M', width: 'col-w sm' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', width: 'col-w lg', format: FormatColumn.Currency },
      { field: 'total', header: 'PRECIO TOTAL', width: 'col-w md', format: FormatColumn.Currency }
    ];
    this.getRequisitionById(this.config.data.id);
    this.getRequisitionDetailByHeaderId(this.config.data.id);
    this.getLogo();
    this.getLogoKR();
    this.getAuthorizers();
  }

  downloadPDF() {
    const dateCreateOn = (moment(`${this.requisition.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const requisitionNamePDF = `P${this.requisition.id}(${this.requisition.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.requisitionHeaderService.getDocumentDefinition(this.headersDetail, this.listRequisitionDetail,
        this.requisition, this.listTaxesAdded, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
    pdfMake.createPdf(documentDefinition).download(requisitionNamePDF);
  }

  showPDF() {
    const documentDefinition =
      this.requisitionHeaderService.getDocumentDefinition(this.headersDetail, this.listRequisitionDetail,
        this.requisition, this.listTaxesAdded, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
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

  // getRequisitionDocuments(requisitionId) {
  //   this.requisitionDocumentService.getRequisitionDocumentsByHeaderId(requisitionId).subscribe(
  //     data => {
  //       this.requisitionDocument = data;
  //       let imageExtension = '';
  //       this.requisitionImages = [];
  //       this.requisitionDocument.forEach(element => {
  //         imageExtension = (element.userName.substr(element.userName.lastIndexOf('.'))).toLowerCase();
  //         if (this.typesImages.indexOf(imageExtension) !== -1) {
  //           this.requisitionImages.push(element);
  //         }
  //       });
  //       this.imageNameSelected = this.requisitionDocument.length !== 0 ? this.requisitionDocument[0].userName : '';
  //     },
  //     error => {
  //       this.toastr.error(error.message);
  //     });
  // }

  downloadDocument(document) {
    this.requisitionDocumentService.downloadRequisitionDocument(document).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${document.userName}`);
      });
  }

  closeForm(): void {
    this.ref.close();
  }

  getRequisitionById(requisitionId) {
    this.requisitionHeaderService.getRequisitionById(requisitionId).subscribe(
      data => {
        this.requisition = data;
        this.data = this.requisition;
        this.requisition.dateOrder = this.requisition.dateOrder !== null ? moment(`${this.requisition.dateOrder}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.getSupplierRecordBySupplierId(data.supplierId);
        this.getRequisitionDetailByHeaderId(data.id);
        this.getAuthorizations(this.requisition.id);
      });
  }

  getRequisitionDetailByHeaderId(requisitionHeaderId) {
    this.requisitionDetailService.getRequisitionDetailByHeaderId(requisitionHeaderId).subscribe(
      data => {
        this.listRequisitionDetail = data;
        this.getRequisitionDetailTaxByHeader(requisitionHeaderId);
        this.calculationTotal();
      });
  }

  getSupplierRecordBySupplierId(supplierId) {
    this.supplierRecordService.getSupplierRecordBySupplierId(supplierId).subscribe(
      data => {
        this.getPlants(data.plantId);
      });
  }

  getPlants(plantId) {
    this.plantService.getPlants().subscribe(
      data => {
        this.requisition.plantName = data.filter(o => o.id === plantId)[0].name;
      });
  }

  getRequisitionDetailTaxByHeader(requisitionHeaderId) {
    this.requisitionDetailTaxService.getRequisitionDetailTaxByRH(requisitionHeaderId).subscribe(
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
    this.quantity = 0;
    for (const item of this.listRequisitionDetail) {
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

  // getRequisitionDetailByHeaderId(Id): void {
  //   this.loadingTable = true;
  //   const params: any = {
  //     spName: 'GetRequisitionDetailByHeaderId',
  //     lstParam: [{
  //       name: '@HeaderId',
  //       dbType: DbType.Int16,
  //       value: Id
  //     }]
  //   };
  //   this.genericService.getDataGeneric(params).subscribe(resp => {
  //     this.listRequisitionDetail = resp;
  //     this.listRequisitionDetail.forEach(element => {
  //       this.total = this.total + element.subTotal_AMT;
  //       this.subTotal = this.subTotal + element.subTotal_AMT;

  //       this.quantity = this.quantity + element.quantity_QTY;
  //     });
  //     this.iva = this.total - this.subTotal;
  //     this.loadingTable = false;
  //   });
  // }

  getAuthorizations(requisitionId) {
    this.authorizationProcessService.getAuthorizations(this.processTypeId, null, this.authorizedStatus, requisitionId).subscribe(
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
