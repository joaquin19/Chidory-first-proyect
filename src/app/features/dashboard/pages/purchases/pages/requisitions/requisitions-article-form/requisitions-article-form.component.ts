import { Component, OnInit } from '@angular/core';
import { ArticleService, TaxService, UnitMeasureService } from '@app/features/dashboard/pages/catalogs/services';
import { Action } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-requisitions-article-form',
  templateUrl: './requisitions-article-form.component.html',
  styleUrls: ['./requisitions-article-form.component.scss']
})
export class RequisitionsArticleFormComponent implements OnInit {

  public requisitionEdition: any;
  public submitted: boolean;
  public listArticle: any;
  public selectedArticle: any;
  public action: Action;
  public listTaxes: any;
  public listUnitMeasure: any;
  public listItemAdded: any;
  public isReadOnly: boolean;
  public supplierId: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public articleService: ArticleService,
    private toastr: ToastrService,
    public taxService: TaxService,
    public unitMeasureService: UnitMeasureService
  ) {
    this.requisitionEdition = {
      id: 0,
      requisitionHeaderId: null,
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
  }

  ngOnInit(): void {
    this.requisitionEdition = this.config.data.article;
    this.action = this.config.data.action;
    this.listItemAdded = this.config.data.listItemAdded;
    this.supplierId = this.config.data.supplierId;
    this.getArticles();
    this.getUnitMeasure();
  }

  getArticles(): void {
    const supplierId = this.supplierId ? this.supplierId : 0;
    this.articleService.getArticles(supplierId).subscribe(
      data => {
        this.listArticle = data;
        this.listArticle = data.filter(({ id }) => !this.listItemAdded.some(exclude => exclude.articleId === id));
        if (this.action === Action.Create) {
          this.isReadOnly = false;
        }
      });
  }

  changeArticle(event) {
    if (this.action === Action.Create) {
      this.requisitionEdition.unitPrice = 0;
      this.requisitionEdition.subTotal = 0;
      this.requisitionEdition.total = 0;
      const articleValue = this.requisitionEdition.id;
      if (articleValue !== null) {
        this.getArticleById(articleValue);
      }
    }
  }

  getArticleById(articleId) {
    this.articleService.getArticleById(articleId).subscribe(
      data => {
        this.requisitionEdition.unitMeasureId = data.unitMeasureId;
        this.requisitionEdition.unitMeasureName = data.unitMeasureName;
        this.requisitionEdition.articleId = data.id;
        this.requisitionEdition.code = data.code;
        this.requisitionEdition.name = data.name;
        this.requisitionEdition.description = data.description;
        this.requisitionEdition.unitPrice = data.unitPrice;
        this.requisitionEdition.dimension = data.dimension;
        this.getTaxesByArticleId(this.requisitionEdition.articleId);
      });
  }

  getTaxesByArticleId(articleId) {
    this.taxService.getTaxesByArticleId(articleId).subscribe(
      data => {
        this.listTaxes = data;
        this.itemCalculation(this.requisitionEdition.unitPrice, this.requisitionEdition.quantity);
      });
  }

  itemCalculation(unitPrice = 0, quantity = 0) {
    this.requisitionEdition.subTotal = unitPrice * quantity;

    if (this.listTaxes.length === 0) {
      this.requisitionEdition.total = unitPrice * quantity;
    } else {
      let valueTotal = 0;
      this.listTaxes.forEach(element => {
        element.amount = (unitPrice * element.valuePercentage) * quantity;
        valueTotal = valueTotal + element.amount;
      });
      valueTotal = valueTotal + (unitPrice * quantity);
      this.requisitionEdition.total = valueTotal;
    }
  }

  blurUnitPrice(event) {
    const element = event.target;
    const valueUnitPrice = element.ariaValueNow;

    if (!isNaN(valueUnitPrice)) {
      const quantity = this.requisitionEdition.quantity != null ? this.requisitionEdition.quantity : 0;
      this.requisitionEdition.quantity = quantity;
      this.itemCalculation(valueUnitPrice, quantity);
      this.requisitionEdition.unitPrice = valueUnitPrice;
    }
  }

  blurQuantity(event) {
    const element = event.target;
    const valueQuantity = parseInt(element.value, 0);

    if (!isNaN(valueQuantity)) {
      this.itemCalculation(this.requisitionEdition.unitPrice, valueQuantity);
    }
  }

  closeForm(): void {
    const resp: any = {};
    resp.flag = 2;
    this.ref.close(resp);
  }

  saveForm(): void {
    this.submitted = true;

    if (this.requisitionEdition.quantity == undefined || this.requisitionEdition.unitPrice == undefined || this.requisitionEdition.unitPrice <= 0) {
      return;
    }
    const itemRequisitionSave: any = {};

    itemRequisitionSave.id = 0;
    itemRequisitionSave.requisitionHeaderId = this.requisitionEdition.requisitionHeaderId;
    itemRequisitionSave.articleId = this.requisitionEdition.id;
    itemRequisitionSave.code = this.requisitionEdition.code;
    itemRequisitionSave.name = this.requisitionEdition.name;
    itemRequisitionSave.description = this.requisitionEdition.description;
    itemRequisitionSave.unitMeasureId = this.requisitionEdition.unitMeasureId;
    itemRequisitionSave.unitMeasureName = this.requisitionEdition.unitMeasureName;
    itemRequisitionSave.unitPrice = this.requisitionEdition.unitPrice;
    itemRequisitionSave.dimension = this.requisitionEdition.dimension;
    itemRequisitionSave.quantity = parseInt(this.requisitionEdition.quantity, 0);
    itemRequisitionSave.subTotal = this.requisitionEdition.subTotal;
    itemRequisitionSave.total = this.requisitionEdition.total;
    itemRequisitionSave.fullName = this.requisitionEdition.fullName;
    itemRequisitionSave.taxes = this.listTaxes;
    itemRequisitionSave.flag = 1;
    this.ref.close(itemRequisitionSave);
  }

  getUnitMeasure(): void {
    this.unitMeasureService.getUnitsMeasure().subscribe(
      data => {
        this.listUnitMeasure = data;
      });
  }

}
