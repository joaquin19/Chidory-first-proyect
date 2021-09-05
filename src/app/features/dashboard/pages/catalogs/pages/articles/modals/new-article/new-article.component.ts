import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ArticleTypeService } from '../../../../services/article-type.service';
import { ArticleService } from '../../../../services/article.service';
import { TaxService } from '../../../../services/tax.service';
import { UnitMeasureService } from '../../../../services/unit-measure.service';
import { SupplierService } from '../../../../services/supplier.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  public action: Action;
  public listUnitMeasure: any;
  public listTax: any;
  public listArticleType: any;
  public listSupplier: any;
  public article: any;
  public taxesData: any;
  public submitted: boolean;
  public currentUser: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public taxService: TaxService,
    public articleTypeService: ArticleTypeService,
    public messageService: MessageService,
    public unitMeasureService: UnitMeasureService,
    private articleService: ArticleService,
    private supplierService: SupplierService,
    private toastr: ToastrService
  ) {
    this.listUnitMeasure = [];
    this.listTax = [];
    this.listSupplier = [];
    this.listArticleType = [];
    this.article = {};
    this.taxesData = [];
    this.submitted = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    const dataReceived = this.config.data;
    this.article = dataReceived.article;
    this.action = dataReceived.action;
    this.getUnitMeasure();
    this.getTaxes();
    this.getArticleTypes();
    this.getArticles();
  }

  getUnitMeasure(): void {
    this.unitMeasureService.getUnitsMeasure().subscribe(
      data => {
        this.listUnitMeasure = data;
      });
  }

  getArticles(): void {
    this.supplierService.getSuppliers().subscribe(
      data => {
        this.listSupplier = data;
      });
  }

  getTaxesByArticleId(): void {
    this.taxService.getTaxesByArticleId(this.article.id).subscribe(
      data => {
        this.taxesData = data;
      });
  }

  getTaxes(): void {
    this.taxService.getTaxes().subscribe(
      data => {
        this.listTax = data;
        if (this.action === Action.Edit) {
          this.getTaxesByArticleId();
        }
      });
  }

  getArticleTypes(): void {
    this.articleTypeService.getArticleTypes().subscribe(
      data => {
        this.listArticleType = data;
      });
  }

  closeForm(resp): void {
    this.ref.close(resp);
  }

  saveForm(): void {

    this.submitted = true;
    const articleSave: any = {};

    articleSave.id = this.article.id;
    articleSave.name = this.article.name;
    articleSave.description = this.article.description;
    articleSave.createBy = this.currentUser.userName;
    articleSave.articleTypeId = this.article.articleTypeId;
    articleSave.supplierId = this.article.supplierId;
    articleSave.unitMeasureId = this.article.unitMeasureId;
    articleSave.code = this.article.code;
    articleSave.unitPrice = this.article.unitPrice;
    articleSave.dimension = (this.article.dimension === null) ? this.article.dimension : this.article.dimension.trim();
    articleSave.taxes = this.taxesData;

    switch (this.action) {
      case Action.Create:
        this.articleService.saveArticle(articleSave).subscribe(data => {
          this.toastr.success('Artículo guardado correctamente.');
          this.closeForm(true);
        });
        break;
      case Action.Edit:
        this.articleService.updateArticle(articleSave).subscribe(data => {
          this.toastr.success('Artículo editado correctamente.');
          this.closeForm(true);
        });
        break;
    }
  }

}
