import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { TaxService } from '@app/features/dashboard/pages/catalogs/services';
import { BusinessUnitService } from '@app/features/dashboard/pages/catalogs/services/business-unit.service';
import { CostCenterService } from '@app/features/dashboard/pages/catalogs/services/cost-center.service';
import { CostTypeService } from '@app/features/dashboard/pages/catalogs/services/cost-type.service';
import { CurrencyService } from '@app/features/dashboard/pages/catalogs/services/currency.service';
import { PaymentTypeService } from '@app/features/dashboard/pages/catalogs/services/payment-type.service';
import { PlantService } from '@app/features/dashboard/pages/catalogs/services/plant.service';
import { PurchaseOrderTypeService } from '@app/features/dashboard/pages/catalogs/services/purchase-order-type.service';
import { SupplierContactService } from '@app/features/dashboard/pages/catalogs/services/supplier-contact.service';
import { SupplierPaymentTermService } from '@app/features/dashboard/pages/catalogs/services/supplier-payment-term.service';
import { SupplierService } from '@app/features/dashboard/pages/catalogs/services/supplier.service';
import { Action, FormatColumn } from '@app/shared/enums';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PurchaseOrderDocumentService, PurchaseOrderHeaderService } from '../../../services';
import { PurchaseOrderDetailTaxService } from '../../../services/purchase-order-detail-tax.service';
import { PurchaseOrderDetailService } from '../../../services/purchase-order-detail.service';
import { PurchaseOrdersArticleModalComponent } from '../purchase-orders-article-modal/purchase-orders-article-modal.component';
import { ConfirmationService } from 'primeng/api';
import { PurchaseOrderType } from '@app/shared/enums/purchaseOrderType';
import { ProjectsService } from '@app/features/dashboard/pages/sales/services';

interface Article {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  quantity?: number;
  unitMeasure?: number;
  unitPrice?: number;
  subTotal?: number;
  total?: number;
  dimension?: string;
  name_NM?: string;
  projectId: number;
  customerId: number;
}

@Component({
  selector: 'app-purchase-orders-form',
  templateUrl: './purchase-orders-form.component.html',
  styleUrls: ['./purchase-orders-form.component.scss']
})
export class PurchaseOrdersFormComponent implements OnInit {

  public ref: DynamicDialogRef;
  public purchaseOrder: any;
  public selectedCountry: string;
  public listPlant: any;
  public listPurchaseOrderType: any;
  public listBusinessUnits: any;
  public listCostTypes: any;
  public listPaymentTypes: any;
  public listSuppliers: any;
  public listSupplierContacts: any;
  public listCurrencies: any;
  public listCostCenters: any;
  public listPaymentTerms: any;
  public listProjects: any;
  public rangeDates: Date[];
  public listPurchaseOrderDetail: any;
  public listPurchaseOrderDocuments: any;
  public pageRedirect: string;
  public listTaxesDetail: any;
  public listTaxesAdded: any;
  public listTaxes: any;
  public files: any;
  public responsiveOptions: any;

  public actionForm: Action;
  public selectedArticle: Article[];
  public submitted: boolean;
  public headers: any;
  public loadingTable: boolean;
  public showFolio: boolean;
  public currentUser: any;

  public total: any;
  public subTotal: any;
  public iva: any;
  public quantity: any;
  public quantityTotal: any;
  public typesFiles: any;
  public fileUploadImage: any;
  public listDocumentSelected: any;
  public purchaseOrderDocument: any;
  public purchaseOrderType = PurchaseOrderType;
  public currencyIdDefault: any;
  public paymentTypeIdDefault: any;
  public paymentTermIdDefault: any;
  public purchaseOrderTypeIdDefault: any;

  constructor(
    private toastr: ToastrService,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    public purchaseOrderHeaderService: PurchaseOrderHeaderService,
    public purchaseOrderDetailService: PurchaseOrderDetailService,
    public purchaseOrderDetailTaxService: PurchaseOrderDetailTaxService,
    public purchaseOrderTypeService: PurchaseOrderTypeService,
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
    public purchaseOrderDocumentService: PurchaseOrderDocumentService,
    public confirmationService: ConfirmationService,
    public projectService: ProjectsService
  ) {
    this.showFolio = false;
    this.purchaseOrder = {
      id: 0,
      folio: '',
      paymentTypeId: null,
      paymentTypeName: '',
      purchaseOrderTypeId: null,
      purchaseOrderTypeName: '',
      requisitionHeaderId: null,
      businessUnitId: null,
      businessUnitName: '',
      costCenterId: null,
      costCenterName: '',
      endPeriod: '',
      estimatedDate: '',
      startPeriod: '',
      supplierContactId: null,
      supplierId: null,
      notes: ' ',
      observations: ' '
    };
    this.headers = [];
    this.listPlant = [];
    this.listPurchaseOrderType = [];
    this.listBusinessUnits = [];
    this.listCostTypes = [];
    this.listPaymentTypes = [];
    this.listSuppliers = [];
    this.listSupplierContacts = [];
    this.listCurrencies = [];
    this.listCostCenters = [];
    this.listPaymentTerms = [];
    this.listPurchaseOrderDetail = [];
    this.listPurchaseOrderDocuments = [];
    this.listProjects = [];
    this.listTaxesDetail = [];
    this.files = [];
    this.loadingTable = false;
    this.pageRedirect = '/dashboard/purchases/purchase-orders';
    this.total = 0;
    this.subTotal = 0;
    this.iva = 0;
    this.quantity = 0;
    this.submitted = false;
    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
      { breakpoint: '768px', numVisible: 2, numScroll: 2 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ];
    this.typesFiles = ['.png', '.jpg', '.jpeg', '.pdf', '.xlsx'/*, '.docx', '.doc'*/];
    this.fileUploadImage = [];
    this.listDocumentSelected = [];
    this.purchaseOrderDocument = [];
    this.currencyIdDefault = 101;
    this.paymentTermIdDefault = 3;
    this.paymentTypeIdDefault = 2;
    this.purchaseOrderTypeIdDefault = 1;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'code', header: 'NO. PARTE', width: 'col-w md' },
      { field: 'description', header: 'DESCRIPCIÓN', width: 'col-w xxl' },
      { field: 'projectName', header: 'PROYECTO', width: 'col-w md' },
      { field: 'customerName', header: 'CLIENTE', width: 'col-w md' },
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
          case 'addPurchaseOrder':
            this.purchaseOrder = {
              id: 0,
              name: '',
              description: '',
              notes: '',
              observations: ''
            };
            this.purchaseOrder.period = [
              (moment().toDate()),
              (moment().add(7, 'days').toDate())
            ];
            this.purchaseOrder.estimatedDate = (moment().add(7, 'days').toDate());
            this.getTaxes();
            this.getBusinessUnits();
            this.actionForm = Action.Create;
            break;
          case 'editPurchaseOrder':
            this.actionForm = Action.Edit;
            this.showFolio = true;
            this.getPurchaseOrderById(params.id);
            this.getPurchaseOrderDetailByHeaderId(params.id);
            this.getPurchaseOrderDetailTaxByHeader(params.id);
            this.getPurchaseOrderDocuments(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });

    this.getPurchaseOrderTypes();
    this.getSuppliers();
    this.getPaymentTypes();
    this.getCostTypes();
    this.getPlants();
    this.getCurrencies();
    this.getSupplierPaymentTerms();
    this.getProjects();
  }

  getPurchaseOrderById(Id): void {
    this.purchaseOrderHeaderService.getPurchaseOrderById(Id).subscribe(
      data => {
        this.purchaseOrder = data;
        this.getBusinessUnits();
        this.getSupplierContactsBySupplierId();
        if (this.purchaseOrder.startPeriod != null) {
          this.purchaseOrder.period = [
            (moment(this.purchaseOrder.startPeriod, 'DD-MM-YYYY').toDate()),
            (moment(this.purchaseOrder.endPeriod, 'DD-MM-YYYY').toDate())
          ];
        } else {
          this.purchaseOrder.period = [
            (moment().toDate()),
            (moment().add(7, 'days').toDate())
          ];
        }
        if (this.purchaseOrder.estimatedDate != null) {
          this.purchaseOrder.estimatedDate = moment(this.purchaseOrder.estimatedDate, 'DD-MM-YYYY').toDate();
        } else {
          this.purchaseOrder.estimatedDate = moment().add(7, 'days').toDate();
        }
      });
  }

  getPurchaseOrderDetailByHeaderId(purchaseOrderId): void {
    this.purchaseOrderDetailService.getPurchaseOrderDetailByHeaderId(purchaseOrderId).subscribe(
      data => {
        this.listPurchaseOrderDetail = data;
        this.calculationTotal();
      });
  }

  getPurchaseOrderDetailTaxByHeader(purchaseOrderId): void {
    this.purchaseOrderDetailTaxService.getPurchaseOrderDetailTaxByPOH(purchaseOrderId).subscribe(
      data => {
        this.listTaxesDetail = data;
        this.getTaxes();
      });
  }

  getPurchaseOrderDocuments(purchaseOrderId): void {
    this.purchaseOrderDocumentService.getPurchaseOrderDocumentsByHeaderId(purchaseOrderId).subscribe(
      data => {
        this.listPurchaseOrderDocuments = data;
      });
  }

  getPurchaseOrderTypes(): void {
    this.purchaseOrderTypeService.getPurchaseOrderTypes().subscribe(
      data => {
        this.listPurchaseOrderType = data;
        if (this.actionForm === Action.Create) {
          this.purchaseOrder.purchaseOrderTypeId = this.purchaseOrderTypeIdDefault;
        }
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
    this.costCenterService.getCostCenterByBusinessUnitId(this.purchaseOrder.businessUnitId).subscribe(
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

  getSupplierContactsBySupplierId(): void {
    this.supplierContactService.getSupplierContactsBySupplierId(this.purchaseOrder.supplierId).subscribe(
      data => {
        this.listSupplierContacts = data;
        if (this.actionForm === Action.Edit) {
          this.selectEmail();
        }
      });
  }

  selectEmail(): void {
    const SupplierContactSelected = this.listSupplierContacts.filter(o => o.id === this.purchaseOrder.supplierContactId)[0];
    this.purchaseOrder.email = SupplierContactSelected.email;
  }

  getPaymentTypes(): void {
    this.paymentTypeService.getPaymentTypes().subscribe(
      data => {
        this.listPaymentTypes = data;
        if (this.actionForm === Action.Create) {
          this.purchaseOrder.paymentTypeId = this.paymentTypeIdDefault;
        }
      });
  }

  getCostTypes(): void {
    this.costTypeService.getCostTypes().subscribe(
      data => {
        this.listCostTypes = data;
      });
  }

  getPlants(): void {
    this.plantService.getPlants().subscribe(
      data => {
        this.listPlant = data;
      });
  }

  getCurrencies(): void {
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        if (this.actionForm === Action.Create) {
          this.purchaseOrder.currencyId = this.currencyIdDefault;
        }
      });
  }

  getSupplierPaymentTerms(): void {
    this.supplierPaymentTermService.getSupplierPaymentTerms().subscribe(
      data => {
        this.listPaymentTerms = data;
        if (this.actionForm === Action.Create) {
          this.purchaseOrder.paymentTermId = this.paymentTermIdDefault;
        }
      });
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      data => {
        this.listProjects = data;
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
    for (const item of this.listPurchaseOrderDetail) {
      this.quantity = this.quantity + item.quantity;
      this.subTotal = this.subTotal + item.subTotal;
      this.total = this.total + item.total;
    }
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

    if (this.purchaseOrder.purchaseOrderTypeId === undefined
      || this.purchaseOrder.businessUnitId === undefined || this.purchaseOrder.costCenterId === undefined
      || this.purchaseOrder.paymentTypeId === undefined
      || this.purchaseOrder.paymentTermId === undefined || this.purchaseOrder.plantId === undefined) {
      this.toastr.warning('Faltan campos por llenar.');
      return;
    }

    if (this.listPurchaseOrderDetail.length === 0) {
      this.toastr.warning('Debe agregar al menos 1 artículo a la orden de compra.');
      return;
    }

    const purchaseOrderSave: any = {};

    const detailArray = [];
    this.listPurchaseOrderDetail.forEach(element => {
      detailArray.push({
        id: element.id,
        unitMeasureId: element.unitMeasureId,
        articleId: element.articleId,
        projectId: element.projectId,
        customerId: element.customerId,
        code: element.code,
        name: element.name,
        description: element.description,
        unitPrice: element.unitPrice,
        dimension: element.dimension,
        quantity: element.quantity,
        subTotal: element.subTotal,
        total: element.total
      });
    });

    purchaseOrderSave.id = this.purchaseOrder.id;
    purchaseOrderSave.purchaseOrderTypeId = this.purchaseOrder.purchaseOrderTypeId;
    purchaseOrderSave.businessUnitId = this.purchaseOrder.businessUnitId;
    purchaseOrderSave.costCenterId = this.purchaseOrder.costCenterId;
    purchaseOrderSave.paymentTypeId = this.purchaseOrder.paymentTypeId;
    purchaseOrderSave.paymentTermId = this.purchaseOrder.paymentTermId;
    purchaseOrderSave.supplierId = this.purchaseOrder.supplierId;
    purchaseOrderSave.supplierContactId = this.purchaseOrder.supplierContactId;
    purchaseOrderSave.currencyId = this.purchaseOrder.currencyId;
    purchaseOrderSave.costTypeId = this.purchaseOrder.costTypeId;
    purchaseOrderSave.projectId = this.purchaseOrder.projectId;
    purchaseOrderSave.estimatedDate = moment(this.purchaseOrder.estimatedDate).format('YYYY-MM-DD');
    purchaseOrderSave.startPeriod = moment(this.purchaseOrder.period[0]).format('YYYY-MM-DD');
    purchaseOrderSave.endPeriod = moment(this.purchaseOrder.period[1]).format('YYYY-MM-DD');
    // purchaseOrderSave.period = this.purchaseOrder.period;
    purchaseOrderSave.previousAmount = this.purchaseOrder.previousAmount;
    purchaseOrderSave.plantId = this.purchaseOrder.plantId;
    purchaseOrderSave.notes = this.purchaseOrder.notes;
    purchaseOrderSave.observations = this.purchaseOrder.observations;
    purchaseOrderSave.detail = this.purchaseOrder.detail;
    purchaseOrderSave.purchaseOrderDetail = detailArray;
    purchaseOrderSave.createBy = this.currentUser.userName;
    purchaseOrderSave.document = [];

    this.files.forEach(item => {
      purchaseOrderSave.document.push({
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

    formData.append('PurchaseOrderHeaderSave', JSON.stringify(purchaseOrderSave));

    switch (this.actionForm) {
      case Action.Create:
        this.purchaseOrderHeaderService.savePurchaseOrder(formData).subscribe(data => {
          this.toastr.success('Orden de Compra guardado correctamente.');
          this.router.navigate([this.pageRedirect]);
        }, error => {
          this.toastr.error(error.message);
        });
        break;
      case Action.Edit:
        this.purchaseOrderHeaderService.updatePurchaseOrder(formData).subscribe(data => {
          this.toastr.success('Orden de Compra editada correctamente.');
          this.router.navigate([this.pageRedirect]);
        }, error => {
          this.toastr.error(error.message);
        });
        break;
    }
  }

  openModal(data): void {
    this.ref = this.dialogService.open(PurchaseOrdersArticleModalComponent, {
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
        if (!this.listPurchaseOrderDetail.some(
          o => o.articleId === result.articleId && o.projectId === result.projectId && o.customerId === result.customerId)) {
          this.listPurchaseOrderDetail.push(result);
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
          this.listPurchaseOrderDetail = this.listPurchaseOrderDetail.filter(
            o => o.articleId !== result.articleId && o.projectId !== result.projectId && o.customerId !== result.customerId);
          this.listPurchaseOrderDetail.push(result);
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

  editModal(rowData): void {
    const data = {
      supplierId: this.purchaseOrder.supplierId,
      action: Action.Edit,
      listItemAdded: this.listPurchaseOrderDetail,
      article: rowData,
      purchaseOrderTypeId: this.purchaseOrder.purchaseOrderTypeId
    };
    this.openModal(data);
  }

  openNew(): void {
    if (this.purchaseOrder.supplierId) {
      const data = {
        supplierId: this.purchaseOrder.supplierId,
        action: Action.Create,
        listItemAdded: this.listPurchaseOrderDetail,
        article: {},
        purchaseOrderTypeId: this.purchaseOrder.purchaseOrderTypeId
      };
      this.openModal(data);
    } else {
      this.toastr.warning('Favor de seleccionar un proveedor.');
    }
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
        this.listPurchaseOrderDetail = this.listPurchaseOrderDetail.filter(o => o.articleId !== rowData.articleId);
        this.listTaxesDetail = this.listTaxesDetail.filter(o => o.articleId !== rowData.articleId);
        this.calculationTaxes();
      }
    });
  }

  downloadDocument(document): void {
    this.purchaseOrderDocumentService.downloadPurchaseOrderDocument(document).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${document.userName}`);
      });
  }

  deleteDocument(document): void {
    this.purchaseOrderDocumentService.deletePurchaseOrderDocument(
      this.purchaseOrder.id,
      document.id,
      document.systemName,
      document.path,
      this.currentUser.userName).subscribe(data => {
        this.toastr.success('Documento borrado correctamente.');
        this.getPurchaseOrderDocuments(this.purchaseOrder.id);
      }, error => {
        this.toastr.error(error.message);
      });
  }

}
