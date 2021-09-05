import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';

import { AuthorizationStatus, FormatColumn, ProcessType } from '@app/shared/enums';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { AuthorizationProcessService } from '@app/shared/services/authorization-process.service';
import {
  RequisitionHeaderService, RequisitionDetailService, RequisitionDetailTaxService, RequisitionDocumentService
} from '../../../services';
import { PlantService, SupplierRecordService, TaxService } from '@app/features/dashboard/pages/catalogs/services';
import { LocalImagesService } from '@app/shared/services/local-images.service';
import { AuthorizerService } from '@app/features/dashboard/pages/catalogs/services/authorizer.service';

@Component({
  selector: 'app-requisitions-authorizer-detail-form',
  templateUrl: './requisitions-authorizer-detail-form.component.html',
  styleUrls: ['./requisitions-authorizer-detail-form.component.scss']
})
export class RequisitionsAuthorizerDetailFormComponent implements OnInit {

  public dataReceived: any;
  public requisition: any;
  public listRequisitionDetail: any;
  public listRequisitionDocuments: any;
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
  public responsiveOptions: any;
  public logoKR: any;
  public processTypeId = ProcessType.Requisition;
  public listAuthorization: any;
  public listAuthorizers: any;
  public authorizedStatus: AuthorizationStatus.Authorized;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authorizationProcessService: AuthorizationProcessService,
    private requisitionHeaderService: RequisitionHeaderService,
    private requisitionDocumentService: RequisitionDocumentService,
    private requisitionDetailService: RequisitionDetailService,
    private requisitionDetailTaxService: RequisitionDetailTaxService,
    private supplierRecordService: SupplierRecordService,
    private taxService: TaxService,
    private plantService: PlantService,
    private toastr: ToastrService,
    public localImagesService: LocalImagesService,
    private authorizerService: AuthorizerService
  ) {
    this.dataReceived = {};
    this.requisition = {};
    this.listRequisitionDetail = [];
    this.listRequisitionDocuments = [];
    this.listTaxesDetail = [];
    this.listTaxesAdded = [];
    this.listTaxes = [];
    this.headers = [];
    this.observations = '';
    this.requiredObservation = false;
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
    this.dataReceived = this.config.data;
    this.getRequisitionById(this.dataReceived.valueId);
    this.getRequisitionDocuments(this.dataReceived.valueId);
    this.getLogo();
    this.getLogoKR();
    this.getAuthorizers();
  }

  getRequisitionById(requisitionId) {
    this.requisitionHeaderService.getRequisitionById(requisitionId).subscribe(
      data => {
        this.requisition = data;
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

  closeForm(resp): void {
    this.ref.close(resp);
  }

  calculationTotal() {
    this.total = 0;
    this.subTotal = 0;
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

  downloadPDF() {
    const dateCreateOn = (moment(`${this.requisition.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const requisitionNamePDF =
      `R${this.requisition.id}(${this.requisition.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.requisitionHeaderService.getDocumentDefinition(this.headers, this.listRequisitionDetail,
        this.requisition, this.listTaxesAdded, this.logo, this.listAuthorization, this.listAuthorizers, this.logoKR);
    pdfMake.createPdf(documentDefinition).download(requisitionNamePDF);
  }

  showPDF() {
    const documentDefinition =
      this.requisitionHeaderService.getDocumentDefinition(this.headers, this.listRequisitionDetail,
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

  processAuthorization(authorizationStatusId) {
    this.authorizationStatusId = authorizationStatusId;

    switch (authorizationStatusId) {
      case AuthorizationStatus.Authorized:
        this.requiredObservation = false;
        break;
      case AuthorizationStatus.Rejected:
        this.requiredObservation = true;
        break;
    }

    if (this.observations === '' && this.authorizationStatusId === AuthorizationStatus.Rejected) {
      return false;
    }

    const authorizationsSave: any = {};

    authorizationsSave.processTypeId = ProcessType.Requisition;
    authorizationsSave.authorizationStatusId = this.authorizationStatusId;
    authorizationsSave.createBy = this.currentUser.userName;
    authorizationsSave.observation = this.observations;

    const detailArray = [];

    detailArray.push({
      id: this.dataReceived.id,
      valueId: this.dataReceived.valueId
    });

    authorizationsSave.detail = detailArray;

    this.authorizationProcessService.updateAuthorizationProcess(authorizationsSave).subscribe(
      data => {
        this.closeForm(this.authorizationStatusId);
      });
  }

  getRequisitionDocuments(requisitionId) {
    this.requisitionDocumentService.getRequisitionDocumentsByHeaderId(requisitionId).subscribe(
      data => {
        this.listRequisitionDocuments = data;
      });
  }

  downloadDocument(document) {
    this.requisitionDocumentService.downloadRequisitionDocument(document).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${document.userName}`);
      });
  }

  getAuthorizations(purchaseOrderId) {
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
