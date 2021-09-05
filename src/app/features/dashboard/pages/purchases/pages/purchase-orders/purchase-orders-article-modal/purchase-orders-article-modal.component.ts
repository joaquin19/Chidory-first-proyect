import { Component, OnInit } from '@angular/core';
import { ArticleService, TaxService, UnitMeasureService } from '@app/features/dashboard/pages/catalogs/services';
import { ProjectsService } from '@app/features/dashboard/pages/sales/services';
import { ProjectCustomerService } from '@app/features/dashboard/pages/sales/services/project-customer.service';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Action, PurchaseOrderType } from 'src/app/shared/enums';

@Component({
  selector: 'app-purchase-orders-article-modal',
  templateUrl: './purchase-orders-article-modal.component.html',
  styleUrls: ['./purchase-orders-article-modal.component.scss']
})
export class PurchaseOrdersArticleModalComponent implements OnInit {

  public purchaseOrderEdition: any;
  public submitted: boolean;
  public listArticle: any;
  public selectedArticle: any;
  public action: Action;
  public listTaxes: any;
  public listUnitMeasure: any;
  public listItemAdded: any;
  public isReadOnly: boolean;
  public purchaseOrderTypeId: any;
  public purchaseOrderType = PurchaseOrderType;
  public listCustomers: any;
  public listProjects: any;
  public projectName: string;
  public supplierId: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public articleService: ArticleService,
    private toastr: ToastrService,
    public taxService: TaxService,
    public unitMeasureService: UnitMeasureService,
    public projectCustomerService: ProjectCustomerService,
    public projectService: ProjectsService
  ) {
    this.purchaseOrderEdition = {
      id: 0,
      purchaseOrderHeaderId: null,
      unitMeasureId: null,
      articleId: null,
      code: '',
      name: '',
      description: '',
      unitPrice: 0,
      dimension: 0,
      quantity: 0,
      subTotal: 0,
      total: 0,
      taxes: []
    };
    this.submitted = false;
    this.listArticle = [];
    this.listTaxes = [];
    this.listItemAdded = [];
    this.isReadOnly = true;
    this.purchaseOrderTypeId = 0;
    this.listCustomers = [];
    this.listProjects = [];
  }

  ngOnInit(): void {
    this.purchaseOrderEdition = this.config.data.article;
    this.action = this.config.data.action;
    this.listItemAdded = this.config.data.listItemAdded;
    this.purchaseOrderTypeId = this.config.data.purchaseOrderTypeId;
    this.supplierId = this.config.data.supplierId;
    this.getArticles();
    this.getUnitMeasure();
  }

  getArticles(): void {

    const supplierId = this.supplierId ? this.supplierId : 0;
    this.articleService.getArticles(supplierId).subscribe(
      data => {
        this.listArticle = data;
        if (this.purchaseOrderTypeId !== this.purchaseOrderType.StandardProjectCustomer) {
          this.listArticle = data.filter(({ id }) => !this.listItemAdded.some(exclude => exclude.articleId === id));
        } else {
          this.getProjects();
        }
        if (this.action === Action.Create) {
          this.isReadOnly = false;
        }
      });
  }

  changeArticle(event) {
    if (this.action === Action.Create) {
      this.purchaseOrderEdition.unitPrice = 0;
      this.purchaseOrderEdition.subTotal = 0;
      this.purchaseOrderEdition.total = 0;
      const articleValue = this.purchaseOrderEdition.articleId;
      if (articleValue !== null) {
        this.getArticleById(articleValue);
      }
    }
  }

  getArticleById(articleId) {
    this.articleService.getArticleById(articleId).subscribe(
      data => {
        this.purchaseOrderEdition.unitMeasureId = data.unitMeasureId;
        this.purchaseOrderEdition.unitMeasureName = data.unitMeasureName;
        this.purchaseOrderEdition.articleId = data.id;
        this.purchaseOrderEdition.code = data.code;
        this.purchaseOrderEdition.name = data.name;
        this.purchaseOrderEdition.description = data.description;
        this.purchaseOrderEdition.unitPrice = data.unitPrice;
        this.purchaseOrderEdition.dimension = data.dimension;
        console.log(this.purchaseOrderEdition);
        this.getTaxesByArticleId(this.purchaseOrderEdition.articleId);
      });
  }

  getTaxesByArticleId(articleId) {
    this.taxService.getTaxesByArticleId(articleId).subscribe(
      data => {
        this.listTaxes = data;
        this.itemCalculation(this.purchaseOrderEdition.unitPrice, this.purchaseOrderEdition.quantity);
      });
  }

  itemCalculation(unitPrice = 0, quantity = 0) {
    this.purchaseOrderEdition.subTotal = unitPrice * quantity;

    if (this.listTaxes.length === 0) {
      this.purchaseOrderEdition.total = unitPrice * quantity;
    } else {
      let valueTotal = 0;
      this.listTaxes.forEach(element => {
        element.amount = (unitPrice * element.valuePercentage) * quantity;
        valueTotal = valueTotal + element.amount;
      });
      valueTotal = valueTotal + (unitPrice * quantity);
      this.purchaseOrderEdition.total = valueTotal;
    }
  }

  blurUnitPrice(event) {
    const element = event.target;
    const valueUnitPrice = element.ariaValueNow;

    if (!isNaN(valueUnitPrice)) {
      const quantity = this.purchaseOrderEdition.quantity != null ? this.purchaseOrderEdition.quantity : 0;
      this.purchaseOrderEdition.quantity = quantity;
      this.itemCalculation(valueUnitPrice, quantity);
      this.purchaseOrderEdition.unitPrice = valueUnitPrice;
    }
  }

  blurQuantity(event) {
    const element = event.target;
    const valueQuantity = parseInt(element.value, 0);

    if (!isNaN(valueQuantity)) {
      this.itemCalculation(this.purchaseOrderEdition.unitPrice, valueQuantity);
    }
  }

  closeForm(): void {
    const resp: any = {};
    resp.flag = 2;
    this.ref.close(resp);
  }

  saveForm(): void {
    this.submitted = true;

    if (this.purchaseOrderEdition.quantity == undefined || this.purchaseOrderEdition.unitPrice == undefined || this.purchaseOrderEdition.unitPrice <= 0) {
      return;
    }

    if (this.purchaseOrderTypeId === this.purchaseOrderType.StandardProjectCustomer && this.purchaseOrderEdition.projectId == undefined && this.purchaseOrderEdition.customerId == undefined) {
      return;
    }

    const itemPurchaseOrderSave: any = {};

    itemPurchaseOrderSave.id = 0;
    itemPurchaseOrderSave.purchaseOrderHeaderId = this.purchaseOrderEdition.purchaseOrderHeaderId;
    itemPurchaseOrderSave.articleId = this.purchaseOrderEdition.articleId;
    itemPurchaseOrderSave.code = this.purchaseOrderEdition.code;
    itemPurchaseOrderSave.name = this.purchaseOrderEdition.name;
    itemPurchaseOrderSave.description = this.purchaseOrderEdition.description;
    itemPurchaseOrderSave.unitMeasureId = this.purchaseOrderEdition.unitMeasureId;
    itemPurchaseOrderSave.unitMeasureName = this.purchaseOrderEdition.unitMeasureName;
    itemPurchaseOrderSave.unitPrice = this.purchaseOrderEdition.unitPrice;
    itemPurchaseOrderSave.dimension = this.purchaseOrderEdition.dimension;
    itemPurchaseOrderSave.quantity = parseInt(this.purchaseOrderEdition.quantity, 0);
    itemPurchaseOrderSave.subTotal = this.purchaseOrderEdition.subTotal;
    itemPurchaseOrderSave.total = this.purchaseOrderEdition.total;
    itemPurchaseOrderSave.fullName = this.purchaseOrderEdition.fullName;
    itemPurchaseOrderSave.taxes = this.listTaxes;
    itemPurchaseOrderSave.projectId = this.purchaseOrderEdition.projectId;
    itemPurchaseOrderSave.customerId = this.purchaseOrderEdition.customerId;
    if (this.purchaseOrderTypeId === this.purchaseOrderType.StandardProjectCustomer) {
      itemPurchaseOrderSave.projectName = this.listProjects.filter(o => o.id == this.purchaseOrderEdition.projectId)[0].name;
      itemPurchaseOrderSave.customerName = this.listCustomers.filter(o => o.customerId == this.purchaseOrderEdition.customerId)[0].customerName;
    }
    itemPurchaseOrderSave.flag = 1;
    this.ref.close(itemPurchaseOrderSave);
  }

  getUnitMeasure(): void {
    this.unitMeasureService.getUnitsMeasure().subscribe(
      data => {
        this.listUnitMeasure = data;
      });
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      data => {
        this.listProjects = data;
        if (this.action === Action.Edit) {
          this.getProjectCustomers(this.purchaseOrderEdition.projectId)
        }
      });
  }

  changeProject(event): void {
    this.getProjectCustomers(event.value)
  }

  getProjectCustomers(projectId): void {
    this.projectCustomerService.getProjectCustomers(projectId).subscribe(
      data => {
        this.listCustomers = data;
      });
  }

}
