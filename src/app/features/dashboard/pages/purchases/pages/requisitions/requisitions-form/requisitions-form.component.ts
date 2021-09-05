import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessUnitService, CostCenterService, CostTypeService, PlantService, SupplierRecordService, TaxService } from '@app/features/dashboard/pages/catalogs/services';
import { CurrencyService } from '@app/features/dashboard/pages/catalogs/services/currency.service';
import { PaymentTypeService } from '@app/features/dashboard/pages/catalogs/services/payment-type.service';
import { SupplierContactService } from '@app/features/dashboard/pages/catalogs/services/supplier-contact.service';
import { SupplierPaymentTermService } from '@app/features/dashboard/pages/catalogs/services/supplier-payment-term.service';
import { SupplierService } from '@app/features/dashboard/pages/catalogs/services/supplier.service';
import { Action, FormatColumn } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequisitionDetailService, RequisitionDetailTaxService, RequisitionDocumentService, RequisitionHeaderService } from '../../../services';
import { RequisitionsArticleFormComponent } from '../requisitions-article-form/requisitions-article-form.component';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { RequisitionTypeService } from '@app/features/dashboard/pages/catalogs/services/requisition-type.service';
import { UserAuthenticationModel } from '@app/core/models/auth.model';

@Component({
  selector: 'app-requisitions-form',
  templateUrl: './requisitions-form.component.html',
  styleUrls: ['./requisitions-form.component.scss']
})
export class RequisitionsFormComponent implements OnInit {

  public ref: DynamicDialogRef;
  public showFolio: boolean;
  public requisition: any;
  public selectedCountry: string;
  public listPlant: any;
  public listRequisitionType: any;
  public listBusinessUnits: any;
  public listCostTypes: any;
  public listPaymentTypes: any;
  public listSuppliers: any;
  public listSupplierContacts: any;
  public listCurrencies: any;
  public listCostCenters: any;
  public listPaymentTerms: any;
  public rangeDates: Date[];
  public headersDetail: any;
  public listRequisitionDetail: any;
  public listTaxesDetail: any;
  public listTaxesAdded: any;
  public listTaxes: any;
  public currentUser: any;
  public files: any;
  public listRequisitionDocuments: any;
  public listDocumentSelected: any;
  public responsiveOptions: any;

  public loadingTable: boolean;
  public pageRedirect: string;
  public total: any;
  public subTotal: any;
  public iva: any;
  public quantity: any;
  public actionForm: Action;
  public currencyIdDefault: any;
  public submitted: boolean;
  public typesFiles: any;
  public requisitionDocument: any;
  public fileUploadImage: any;

  constructor(
    private toastr: ToastrService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    public requisitionTypeService: RequisitionTypeService,
    public businessUnitService: BusinessUnitService,
    public costCenterService: CostCenterService,
    public supplierService: SupplierService,
    public paymentTypeService: PaymentTypeService,
    public costTypeService: CostTypeService,
    public supplierContactService: SupplierContactService,
    public plantService: PlantService,
    public currencyService: CurrencyService,
    public supplierPaymentTermService: SupplierPaymentTermService,
    public taxService: TaxService,
    public requisitionHeaderService: RequisitionHeaderService,
    public requisitionDetailService: RequisitionDetailService,
    public requisitionDetailTaxService: RequisitionDetailTaxService,
    public confirmationService: ConfirmationService,
    public supplierRecordService: SupplierRecordService,
    public requisitionDocumentService: RequisitionDocumentService
  ) {
    this.showFolio = false;
    this.requisition = {};
    this.listPlant = [];
    this.listRequisitionType = [];
    this.listBusinessUnits = [];
    this.listCostTypes = [];
    this.listPaymentTypes = [];
    this.listSuppliers = [];
    this.listSupplierContacts = [];
    this.listCurrencies = [];
    this.listCostCenters = [];
    this.listPaymentTerms = [];
    this.headersDetail = [];
    this.listRequisitionDetail = [];
    this.listTaxesDetail = [];
    this.listRequisitionDocuments = [];
    this.requisitionDocument = [];
    this.listDocumentSelected = [];
    this.fileUploadImage = [];
    this.files = [];
    this.loadingTable = false;
    this.pageRedirect = '/dashboard/purchases/requisitions';
    this.total = 0;
    this.subTotal = 0;
    this.iva = 0;
    this.quantity = 0;
    this.actionForm = Action.None;
    this.currencyIdDefault = 101;
    this.submitted = false;
    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
      { breakpoint: '768px', numVisible: 2, numScroll: 2 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ];
    this.typesFiles = ['.png', '.jpg', '.jpeg', '.pdf', '.xlsx'/*, '.docx', '.doc'*/];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headersDetail = [
      { field: 'code', header: 'NO. PARTE', width: 'col-w md' },
      { field: 'description', header: 'DESCRIPCIÓN', width: 'col-w xxl' },
      { field: 'quantity', header: 'CANTIDAD', width: 'col-w md' },
      { field: 'unitMeasureName', header: 'U/M', width: 'col-w sm' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', width: 'col-w lg', format: FormatColumn.Currency },
      { field: 'total', header: 'PRECIO TOTAL', width: 'col-w md', format: FormatColumn.Currency }
    ];

    this.showForm();
  }

  showForm(): void {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addRequisition':
            this.actionForm = Action.Create;
            this.requisition = {
              id: 0,
              name: '',
              description: '',
              notes: '',
              observations: ''
            };
            this.getTaxes();
            this.requisition.dateOrder = moment().add(7, 'days').toDate();
            this.getBusinessUnits();
            break;
          case 'editRequisition':
            this.showFolio = true;
            this.actionForm = Action.Edit;
            this.getRequisitionById(params.id);
            this.getRequisitionDetailByHeaderId(params.id);
            this.getRequisitionDocuments(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });

    this.getRequisitionTypes();
    this.getSuppliers();
    this.getPaymentTypes();
    this.getCostTypes();
    this.getCurrencies();
    this.getSupplierPaymentTerms();
  }

  getRequisitionById(Id): void {
    this.requisitionHeaderService.getRequisitionById(Id).subscribe(
      data => {
        this.requisition = data;
        if (this.requisition.dateOrder != null) {
          this.requisition.dateOrder = moment(this.requisition.dateOrder, 'DD-MM-YYYY').toDate();
        } else {
          this.requisition.dateOrder = moment().add(7, 'days').toDate();
        }
        if (this.actionForm === Action.Edit) {
          this.getSupplierRecordBySupplierId();
          this.getBusinessUnits();
        }
      });
  }
  getRequisitionDetailByHeaderId(requisitionId): void {
    this.requisitionDetailService.getRequisitionDetailByHeaderId(requisitionId).subscribe(
      data => {
        this.listRequisitionDetail = data;
        this.calculationTotal();
      });
  }

  getPurchaseOrderDetailTaxByHeader(requisitionId): void {
    this.requisitionDetailTaxService.getRequisitionDetailTaxByRH(requisitionId).subscribe(
      data => {
        this.listTaxesDetail = data;
        this.getTaxes();
      });
  }

  getRequisitionDocuments(requisitionId): void {
    this.requisitionDocumentService.getRequisitionDocumentsByHeaderId(requisitionId).subscribe(
      data => {
        this.listRequisitionDocuments = data;
      });
  }

  getRequisitionTypes(): void {
    this.requisitionTypeService.getRequisitionTypes().subscribe(
      data => {
        this.listRequisitionType = data;
      });
  }

  getBusinessUnits(): void {
    this.businessUnitService.getBusinessUnits().subscribe(
      data => {
        this.listBusinessUnits = data;
        if (this.actionForm === Action.Edit) {
          this.getCostCenters();
        }
      });
  }

  getCostCenters(): void {
    this.costCenterService.getCostCenterByBusinessUnitId(this.requisition.businessUnitId).subscribe(
      data => {
        this.listCostCenters = data;
      });
  }

  getSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(
      data => {
        this.listSuppliers = data;
      });
  }

  getSupplierRecordBySupplierId(): void {
    this.supplierRecordService.getSupplierRecordBySupplierId(this.requisition.supplierId).subscribe(
      data => {
        this.getPlants(data.plantId);
        this.getSupplierContactsBySupplierId();
      });
  }

  getPaymentTypes(): void {
    this.paymentTypeService.getPaymentTypes().subscribe(
      data => {
        this.listPaymentTypes = data;
      });
  }

  getCostTypes(): void {
    this.costTypeService.getCostTypes().subscribe(
      data => {
        this.listCostTypes = data;
      });
  }

  getPlants(plantId): void {
    this.plantService.getPlants().subscribe(
      data => {
        this.listPlant = data.filter(o => o.id === plantId);
        this.requisition.plantId = this.listPlant[0].id;
      });
  }

  getCurrencies(): void {
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        if (this.actionForm === Action.Create) {
          this.requisition.currencyId = this.currencyIdDefault;
        }
      });
  }

  getSupplierPaymentTerms(): void {
    this.supplierPaymentTermService.getSupplierPaymentTerms().subscribe(
      data => {
        this.listPaymentTerms = data;
      });
  }

  getTaxes(): void {
    this.taxService.getTaxes().subscribe(
      data => {
        this.listTaxes = data;
        for (const item of this.listTaxes) {
          item.amount = 0;
        }
        if (this.actionForm === Action.Edit) {
          this.calculationTaxes();
        }
      });
  }

  calculationTaxes(): void {
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
    this.listTaxesAdded = [];
    this.listTaxesAdded = this.listTaxes.filter(({ id }) => this.listTaxesDetail.some(o => o.taxId === id));
    this.calculationTotal();
  }

  calculationTotal(): void {
    this.quantity = 0;
    this.total = 0;
    this.subTotal = 0;
    for (const item of this.listRequisitionDetail) {
      this.quantity = this.quantity + item.quantity;
      this.subTotal = this.subTotal + item.subTotal;
      this.total = this.total + item.total;
    }
  }

  editModal(rowData): void {
    const data = {
      supplierId: this.requisition.supplierId,
      action: Action.Edit,
      listItemAdded: this.listRequisitionDetail,
      article: rowData
    };
    this.openModal(data);
  }

  openNew(): void {
    if (this.requisition.supplierId) {
      const data = {
        supplierId: this.requisition.supplierId,
        action: Action.Create,
        listItemAdded: this.listRequisitionDetail,
        article: {}
      };
      this.openModal(data);
    } else {
      this.toastr.warning('Favor de seleccionar un proveedor.');
    }
  }

  getSupplierContactsBySupplierId(): void {
    this.supplierContactService.getSupplierContactsBySupplierId(this.requisition.supplierId).subscribe(
      data => {
        this.listSupplierContacts = data;
        if (this.actionForm === Action.Edit) {
          this.selectEmail();
        }
      });
  }

  selectEmail(): void {
    const SupplierContactSelected = this.listSupplierContacts.filter(o => o.id === this.requisition.supplierContactId)[0];
    this.requisition.email = SupplierContactSelected.email;
  }

  openModal(data): void {
    this.ref = this.dialogService.open(RequisitionsArticleFormComponent, {
      data,
      header: 'Agregar Artículo',
      width: '65%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (result !== undefined && result.flag === 1) {
        // new article
        if (!this.listRequisitionDetail.some(o => o.articleId === result.articleId)) {
          this.listRequisitionDetail.push(result);
          for (const tax of result.taxes) {
            const arrayTax: any = {
              id: 0,
              articleId: result.articleId,
              taxId: tax.id,
              valuePercentage: tax.valuePercentage,
              amount: tax.amount
            };
            this.listTaxesDetail.push(arrayTax);
          }
        } else {
          // edit article
          this.listRequisitionDetail = this.listRequisitionDetail.filter(o => o.articleId !== result.articleId);
          this.listRequisitionDetail.push(result);
          for (const itemD of this.listTaxesDetail) {
            if (itemD.articleId === result.articleId) {
              for (const tax of result.taxes) {
                itemD.amount = tax.amount;
              }
            }
          }
        }
        this.calculationTaxes();
      }
    });
  }

  confirmDeleteItemPurchaseOrder(rowData): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar el artículo <strong>${rowData.fullName}</strong>?`,
      header: 'Borrar Artículo',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.listRequisitionDetail = this.listRequisitionDetail.filter(o => o.articleId !== rowData.articleId);
        this.listTaxesDetail = this.listTaxesDetail.filter(o => o.articleId !== rowData.articleId);
        this.calculationTaxes();
      }
    });
  }

  documentSelect(id, event): void {
    if (event.currentFiles.length > 5) {
      this.toastr.error('error');
      return;
    }
    let fileExtension = '';

    for (const file of event.currentFiles) {
      fileExtension = (file.name.substr(file.name.lastIndexOf('.'))).toLowerCase();
      if (this.typesFiles.indexOf(fileExtension) === -1) {
        this.toastr.warning(`Solo se permiten archivos de tipo ${this.typesFiles}`);
        this.fileUploadImage.nativeElement.value = '';
        return;
      }
    }

    this.files = [];
    this.listDocumentSelected = [];
    for (let index = 0; index < event.currentFiles.length; index++) {
      this.files.push(event.currentFiles[index]);
      this.listDocumentSelected[index] = event.currentFiles[index].name;
    }
  }

  onRemove(event): void {
    this.files = this.files.filter(o => o.name !== event.file.name);
  }

  saveForm(): void {
    this.submitted = true;

    // if (this.formRequisition.invalid) {
    //   return;
    // }

    if (this.listRequisitionDetail.length === 0) {
      this.toastr.warning('Debe agregar al menos 1 artículo a la requisición.');
      return;
    }

    const requisitionSave: any = {};

    const detailArray = [];
    this.listRequisitionDetail.forEach(element => {
      detailArray.push({
        id: element.id,
        requisitionHeaderId: element.requisitionHeaderId,
        articleId: element.articleId,
        code: element.code,
        name: element.name,
        description: element.description,
        unitPrice: element.unitPrice,
        dimension: element.dimension,
        quantity: element.quantity,
        subTotal: element.subTotal,
        total: element.total,
        estimatedDate: moment(element.estimatedDate).format('YYYY-MM-DD')
      });
    });

    requisitionSave.id = this.requisition.id;
    requisitionSave.requisitionTypeId = this.requisition.requisitionTypeId;
    requisitionSave.supplierId = this.requisition.supplierId;
    requisitionSave.businessUnitId = this.requisition.businessUnitId;
    requisitionSave.supplierContactId = this.requisition.supplierContactId;
    requisitionSave.costCenterId = this.requisition.costCenterId;
    requisitionSave.currencyId = this.requisition.currencyId;
    requisitionSave.dateOrder = moment(this.requisition.dateOrder).format('YYYY-MM-DD');
    requisitionSave.detail = detailArray;
    requisitionSave.createBy = this.currentUser.userName;
    requisitionSave.document = [];

    this.files.forEach(item => {
      requisitionSave.document.push({
        id: item.id,
        userName: item.name,
        systemName: '',
        path: ''
      });
    });

    const formData = new FormData();

    this.files.forEach(item => {
      formData.append('files', item, item.name);
    });

    formData.append('requisitionHeaderSave', JSON.stringify(requisitionSave));

    switch (this.actionForm) {
      case Action.Create:
        this.requisitionHeaderService.saveRequisition(formData).subscribe(data => {
          this.toastr.success('Requisición guardada correctamente.');
          this.router.navigate([this.pageRedirect]);
        }, error => {
          this.toastr.error(error.message);
        });
        break;
      case Action.Edit:
        this.requisitionHeaderService.updateRequisition(formData).subscribe(data => {
          this.toastr.success('Requisición editada correctamente.');
          this.router.navigate([this.pageRedirect]);
        }, error => {
          this.toastr.error(error.message);
        });
        break;
    }
  }

  downloadDocument(document): void {
    this.requisitionDocumentService.downloadRequisitionDocument(document).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${document.userName}`);
      });
  }

  deleteDocument(document): void {
    this.requisitionDocumentService.deleteRequisitionDocument(
      this.requisition.id,
      document.id,
      document.systemName,
      document.path,
      this.currentUser.userName).subscribe(data => {
        this.toastr.success('Documento borrado correctamente.');
        this.getRequisitionDocuments(this.requisition.id);
      }, error => {
        this.toastr.error(error.message);
      });
  }

}
