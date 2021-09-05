import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';

import { UserAuthenticationModel } from '@app/core/models/auth.model';
import {
  PurchaseOrderDetailService, PurchaseOrderHeaderService, ReconciliationHeaderService,
  SupplierInvoiceDetailService, SupplierInvoiceDocumentService
} from '../../../services';
import { LocalImagesService } from '@app/shared/services/local-images.service';
import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { AuthorizerService } from '@app/features/dashboard/pages/catalogs/services/authorizer.service';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';
import { DownloadFileService } from '@app/shared/services/download-file.service';

@Component({
  selector: 'app-reconciliation-edition-form',
  templateUrl: './reconciliation-edition-form.component.html',
  styleUrls: ['./reconciliation-edition-form.component.scss']
})
export class ReconciliationEditionFormComponent implements OnInit {

  public reconciliation: any;
  public listInvoiceDetail: any;
  public cols: any;
  public colsInvoice: any;
  public listPurchaseOrderDetail: any;
  public invoiceDetail: any;
  public pageRedirect: string;
  public period: Date[];
  public typesFiles: any;
  public typesFilesPDF: any;
  public totalPurchaseOrder: any;
  public totalInvoice: any;
  public currentUser: any;
  public logo: any;
  public refresh: boolean;
  public loadedPurchaseOrder: boolean;
  public loadedInvoive: boolean;
  public loadedOneTime: boolean;
  public submitted: boolean;
  public logoKR: any;
  public processTypeId = ProcessType.Reconciliation;
  public listAuthorization: any;
  public listAuthorizers: any;
  public authorizedStatus: AuthorizationStatus.Authorized;
  public listDocuments: any;
  public fileXML: number;
  public filePDF: number;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public reconciliationHeaderService: ReconciliationHeaderService,
    public purchaseOrderDetailService: PurchaseOrderDetailService,
    public supplierInvoiceDetailService: SupplierInvoiceDetailService,
    public purchaseOrderHeaderService: PurchaseOrderHeaderService,
    private localImagesService: LocalImagesService,
    private authorizerService: AuthorizerService,
    private authorizationProcessService: AuthorizationProcessService,
    private supplierInvoiceDocumentService: SupplierInvoiceDocumentService,
    private downloadFileService: DownloadFileService
  ) {
    this.reconciliation = {};
    this.cols = [];
    this.colsInvoice = [];
    this.listPurchaseOrderDetail = [];
    this.invoiceDetail = [];
    this.pageRedirect = "/dashboard/purchases/reconciliation";
    this.typesFiles = ['.xml'];
    this.typesFilesPDF = ['.pdf'];
    this.totalPurchaseOrder = 0;
    this.totalInvoice = 0;
    this.logo = '';
    this.refresh = false;
    this.loadedOneTime = false;
    this.loadedPurchaseOrder = false;
    this.loadedInvoive = false;
    this.logoKR = '';
    this.listAuthorization = [];
    this.listAuthorizers = [];
    this.listDocuments = [];
    this.fileXML = 1;
    this.filePDF = 2;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.cols = [
      { field: 'purchaseOrderHeaderId', header: 'NO. OC', width: 'col-w md' },
      { field: 'articleName', header: 'DESCRIPCIÓN', width: 'col-w xl' },
      { field: 'quantity', header: 'CANTIDAD', format: FormatColumn.Quantity, width: 'col-w sm' },
      { field: 'unitMeasureName', header: 'U/M', width: 'col-w md' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', format: FormatColumn.Currency, width: 'col-w md' },
      { field: 'total', header: 'PRECIO TOTAL', format: FormatColumn.Currency, width: 'col-w md' }
    ];

    this.colsInvoice = [
      { field: 'quantity', header: 'CANTIDAD', format: FormatColumn.Quantity, width: 'col-w sm' },
      { field: 'unitMeasure', header: 'U/M', width: 'col-w md' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', format: FormatColumn.Currency, width: 'col-w md' },
      { field: 'total', header: 'PRECIO TOTAL', format: FormatColumn.Currency, width: 'col-w md' }
    ];

    this.showForm();
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'editReconciliation':
            this.reconciliation.id = params.id;
            this.getReconciliationById();

            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
    this.getListPurchaseOrderDetailByReconciliation();
    this.getLogo();
    this.getLogoKR();
    this.getAuthorizers();
  }

  getReconciliationById(): void {
    this.reconciliationHeaderService.getReconciliationById(this.reconciliation.id).subscribe(data => {
      this.reconciliation = data;
      if (this.reconciliation.startPeriod != null) {
        this.reconciliation.period = [
          (moment(this.reconciliation.startPeriod, 'DD-MM-YYYY').toDate()),
          (moment(this.reconciliation.endPeriod, 'DD-MM-YYYY').toDate())
        ];
      }
      this.getAuthorizations(this.reconciliation.id);
      if (this.reconciliation.supplierInvoiceHeaderId) {
        this.getDocumentsSupplierInvoice(this.reconciliation.supplierInvoiceHeaderId);
      }
    }, error => {
      this.toastr.error(error.message);
    });
  }

  getListPurchaseOrderDetailByReconciliation() {
    this.purchaseOrderDetailService.getPurchaseOrderDetailByReconciliation(this.reconciliation.id).subscribe(data => {
      this.listPurchaseOrderDetail = data;
      this.getSupplierInvoiceDetailByReconciliationId();
      this.calculatePurchaseOrderTotal();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  calculatePurchaseOrderTotal() {
    this.totalPurchaseOrder = 0;
    this.listPurchaseOrderDetail.forEach(element => {
      this.totalPurchaseOrder = this.totalPurchaseOrder + element.total;
    });
  }

  getSupplierInvoiceDetailByReconciliationId() {
    this.supplierInvoiceDetailService.getSupplierInvoiceDetailByReconciliationId(this.reconciliation.id).subscribe(data => {
      this.listInvoiceDetail = data;
      if (this.listInvoiceDetail.length > 0) {
        this.listInvoiceDetail.forEach(element => {
          element.remarck = true;
        });
      }
      this.calculateInvoiceTotal();
      this.refreshRemarck();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  calculateInvoiceTotal() {
    this.totalInvoice = 0;
    this.listInvoiceDetail.forEach(element => {
      this.totalInvoice = this.totalInvoice + element.total;
    });
  }

  invoiceXLSSelect(event) {
    console.log('invoiceXLSSelect', event.currentFiles[0]);
    const file = event.currentFiles[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    if (this.typesFiles.indexOf(fileExtension) === -1) {
      this.toastr.warning(`Solo se permiten archivos de tipo ${this.typesFiles}`);
      return;
    }
    const fileItem = { file };
    this.saveXLS(fileItem);
  }

  sendFile() {
    console.log('send File');
  }

  saveXLS(fileItem) {
    let fileSave: any = {};

    fileSave.Id = this.reconciliation.id;
    fileSave.CreateBy = this.currentUser.userName;
    fileSave.SupplierId = this.reconciliation.supplierId;
    fileSave.document = [];

    fileSave.document.push({
      id: 0,
      userName: fileItem.file.name,
      systemName: '',
      path: ''
    });

    const formData = new FormData();

    formData.append('file', fileItem.file, fileItem.file.name);
    formData.append('reconciliationHeaderSave', JSON.stringify(fileSave));

    this.reconciliationHeaderService.saveSupplierInvoiceXML(formData).subscribe(data => {
      this.toastr.success('XML guardado correctamente.');
      this.reconciliation.supplierInvoiceHeaderId = data.supplierInvoiceHeaderId;
      this.getReconciliationById();
      this.getSupplierInvoiceDetailByReconciliationId();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  public downloadPDF() {
    const dateCreateOn = (moment(`${this.reconciliation.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const purchaseOrderNamePDF =
      `C${this.reconciliation.id}(${this.reconciliation.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.reconciliationHeaderService.getDocumentDefinition(this.listPurchaseOrderDetail, this.listInvoiceDetail, this.reconciliation, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
    pdfMake.createPdf(documentDefinition).download(purchaseOrderNamePDF);
  }

  public showPDF() {
    const documentDefinition =
      this.reconciliationHeaderService.getDocumentDefinition(this.listPurchaseOrderDetail, this.listInvoiceDetail, this.reconciliation, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
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

  getAuthorizations(reconciliationId) {
    this.authorizationProcessService.getAuthorizations(this.processTypeId, null, this.authorizedStatus, reconciliationId).subscribe(
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

  rowDrop(event) {
    this.refreshRemarck();
  }

  refreshRemarck() {
    let i = 0;
    const sizePurchaseOrder = this.listPurchaseOrderDetail.length;
    this.listInvoiceDetail.forEach(element => {
      if (i < sizePurchaseOrder) {
        element.remarck = (this.listPurchaseOrderDetail[i].subTotal == element.subTotal) ? true : false;
      } else {
        element.remarck = false;
      }
      i++;
    });
  }

  saveForm() {

    console.log(this.listPurchaseOrderDetail);

    this.submitted = true;

    // if (this.formReconciliation.invalid) {
    //   return;
    // }
    const reconciliationHeaderSave: any = {};

    reconciliationHeaderSave.id = this.reconciliation.id;
    console.log(this.reconciliation.period);
    if (this.reconciliation.period != undefined) {
      reconciliationHeaderSave.startPeriod = moment(this.reconciliation.period[0]).format('YYYY-MM-DD');
      reconciliationHeaderSave.endPeriod = moment(this.reconciliation.period[1]).format('YYYY-MM-DD');
    }
    reconciliationHeaderSave.previousAmount = this.reconciliation.previousAmount;
    reconciliationHeaderSave.discrepancy = this.reconciliation.discrepancy;
    reconciliationHeaderSave.justification = this.reconciliation.justification;
    reconciliationHeaderSave.reconciliationPurchaseOrderDetail = [];
    reconciliationHeaderSave.createBy = this.currentUser.userName;

    this.listPurchaseOrderDetail.forEach(element => {
      reconciliationHeaderSave.reconciliationPurchaseOrderDetail.push({
        purchaseOrderHeaderId: element.purchaseOrderHeaderId,
        purchaseOrderDetailId: element.id
      });
    });

    const formData = new FormData();
    formData.append('reconciliationHeaderSave', JSON.stringify(reconciliationHeaderSave));

    this.reconciliationHeaderService.updateReconciliation(formData).subscribe(data => {
      this.toastr.success('Conciliación guardada correctamente.');
      this.router.navigate([this.pageRedirect]);
    }, error => {
      this.toastr.error(error.message);
    });
  }

  getDocumentsSupplierInvoice(supplierInvoiceHeaderId) {
    this.supplierInvoiceDocumentService.getSupplierInvoiceDocumentsByHeaderId(supplierInvoiceHeaderId).subscribe(
      data => {
        this.listDocuments = data;
      });
  }

  downloadFile(typeFile) {
    let file: any;

    switch (typeFile) {
      case 1:
        file = this.listDocuments.filter(o => o.userName.substring(
          o.userName.lastIndexOf('.') + 1, o.userName.length) === 'xml')[0];
        break;
      case 2:
        file = this.listDocuments.filter(o =>
          o.userName.substring(o.userName.lastIndexOf('.') + 1, o.userName.length) === 'pdf')[0];
        break;
    }

    this.downloadFileService.getFile(file).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${file.userName}`);
      });
  }

}
