import { Component, OnInit, ViewChild } from '@angular/core';
import { TableListComponent } from '../../../../../../../shared/components/table-list/table-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewArticleComponent } from '../modals/new-article/new-article.component';
import { ArticleService } from '../../../services/article.service';
import { Action, FormatColumn } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { UserAuthenticationModel } from '@app/core/models/auth.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class ArticlesListComponent implements OnInit {

  @ViewChild('tableList', { static: false })

  public tableList: TableListComponent;
  public ref: DynamicDialogRef;
  public action: Action;
  public headers: any;
  public listArticles: any;
  public loadingTable: boolean;
  public currentUser: any;

  constructor(
    private toastr: ToastrService,
    public articleService: ArticleService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    this.headers = [];
    this.listArticles = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'code', header: 'Código' },
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripción' },
      { field: 'articleTypeName', header: 'Tipo Artículo' },
      { field: 'unitPrice', header: 'Precio Unitario', format: FormatColumn.Currency },
      { field: 'unitMeasureName', header: 'Unidad de Medida' },
      { field: 'dimension', header: 'Dimensión' }
    ];

    this.getData();
  }

  getData(): void {
    this.getArticles();
  }

  refreshData(): void {
    this.getData();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Listado de Artículos`, true, headersExcel);
  }

  getArticles(): void {
    this.articleService.getArticles().subscribe(
      data => {
        this.listArticles = data;
      });
  }

  deleteItem(event): void {
    this.confirmationService.confirm({
      message: 'Está seguro de eliminar el artículo?',
      header: 'Borrar Artículo',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {

        this.deleteArticle(event.id);
      }
    });
  }

  deleteArticle(articleId): void {
    this.articleService.deleteArticle(articleId, this.currentUser.userName).subscribe(
      data => {
        this.toastr.success('Artículo eliminado correctamente.');
        this.getArticles();
      });
  }

  editItem(event): void {
    const data = {
      article: { ...event },
      header: 'Editar Artículo',
      action: Action.Edit
    };
    this.openModal(data);
  }

  newArticle(): void {
    const data = {
      article: {},
      header: 'Nuevo Artículo',
      action: Action.Create
    };
    this.openModal(data);
  }

  openModal(data): void {
    this.ref = this.dialogService.open(NewArticleComponent, {
      data,
      header: data.header,
      width: '50%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.refreshData();
      }
    });
  }

}
