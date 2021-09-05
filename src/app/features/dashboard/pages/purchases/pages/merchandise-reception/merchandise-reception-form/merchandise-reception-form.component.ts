import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { TableListComponent } from '@app/shared/components/table-list/table-list.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MerchandiseReceptionHeaderService } from '../../../services';
import { MerchandiseReceptionArticleModalComponent } from '../merchandise-reception-article-modal/merchandise-reception-article-modal.component';
import { MerchandiseReceptionDetailModalComponent } from '../merchandise-reception-detail-modal/merchandise-reception-detail-modal.component';
import { FormatColumn } from '../../../../../../../shared/enums/format-column';
import * as moment from 'moment';

@Component({
  selector: 'app-merchandise-reception-form',
  templateUrl: './merchandise-reception-form.component.html',
  styleUrls: ['./merchandise-reception-form.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class MerchandiseReceptionFormComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public ref: DynamicDialogRef;
  public merchandiseReception: any;
  public articles: any;
  public listDetailData: any;
  public pageRedirect: string;
  public headersDetail: any;
  public loadingTable: boolean;
  public detailDialog: boolean;
  public editDialog: boolean;
  public currentUser: any;

  constructor(
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private merchandiseReceptionHeaderService: MerchandiseReceptionHeaderService,
    public dialogService: DialogService,
    public messageService: MessageService,
  ) {
    this.merchandiseReception = {
      folio: '',
      purchaseOrderHeaderId: 0,
      supplierId: 0,
      statusId: 0,
      statusName: '',
      supplierName: '',
      receptionDate: null
    };
    this.articles = {
      id: 0,
      merchandiseReceptionHeaderId: 0,
      purchaseOrderHeaderId: 0,
      articleId: 0,
      code: '',
      fullName: '',
      description: '',
      quantity: 0,
      receivedQuantity: 0,
      receptionDate: null,
      pendingQuantity: 0,
      lastRecord: 0,
      subTotal: 0,
      total: 0
    };
    this.listDetailData = [];
    this.pageRedirect = '/dashboard/purchases/merchandise-reception';
    this.headersDetail = [];
    this.loadingTable = false;
    this.detailDialog = false;
    this.editDialog = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headersDetail = [
      { field: 'fullName', header: 'Artículo', width: 'col-w xxl' },
      { field: 'quantity', header: 'Cantidad Solicitada', width: 'col-w xl' },
      { field: 'receivedQuantity', header: 'Cantidad Recibida', width: 'col-w xl' },
      { field: 'pendingQuantity', header: 'Cantidad Pendiente', width: 'col-w xl' },
      { field: 'receptionDate', header: 'Fecha Recepción', width: 'col-w lg' },
    ];

    this.showForm();
  }

  showForm(): void {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addMerchandiseReception':
            this.merchandiseReception = {
              id: 0,
              material: '',
              quantity: '',
              receptionDate: null,
              quantityReceived: null,
              quantityPending: null
            };
            break;
          case 'editMerchandiseReception':
            this.getMerchandiseReception(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
  }

  getMerchandiseReception(purchaseOrderHeaderId): void {
    this.merchandiseReceptionHeaderService.getMerchandiseReceptionByPurchaseOrderId(purchaseOrderHeaderId).subscribe(
      data => {
        this.merchandiseReception = data;
        this.getMerchandiseReceptionDetail();
      });
  }

  getMerchandiseReceptionDetail(): void {
    this.merchandiseReceptionHeaderService.getMerchandiseReceptionDetailByPOH(this.merchandiseReception.purchaseOrderHeaderId).subscribe(
      data => {
        this.articles = data;
        console.log(data);

        this.articles.forEach(e => {
          e.edit =  e.lastRecord === 1 && e.pendingQuantity !== 0 ? true : false;
          e.delete = e.lastRecord === 1 && e.pendingQuantity !== 0 ? true : false;
          e.receptionDate =  e.receptionDate !== null ? moment(e.receptionDate, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD') : '';
        });
      });
  }

  getMerchandiseReceptionDocumentsByDetail(merchandiseReceptionId, merchandiseReceptionDetailId, purchaseOrderHeaderId): void {
    this.merchandiseReceptionHeaderService.getMerchandiseReceptionDocumentsByMRD(
      merchandiseReceptionId,
      merchandiseReceptionDetailId).subscribe(
        data => {
          const merchandiseReceptionDelete: any = {};
          merchandiseReceptionDelete.merchandiseReceptionHeaderId = merchandiseReceptionId;
          merchandiseReceptionDelete.merchandiseReceptionDetailId = merchandiseReceptionDetailId;
          merchandiseReceptionDelete.deleteBy = this.currentUser.userName;
          merchandiseReceptionDelete.merchandiseReceptionDocument = data;
        });
  }

  deleteItem(value): void {
      this.confirmationService.confirm({
        message: 'Esta Seguro de Borrar esta Mercancia?',
        header: 'Borrar Mercancia',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-danger',
        rejectVisible: false,
        accept: () => {
          this.merchandiseReceptionHeaderService.deleteMerchandiseReceptionDetail(
            value.merchandiseReceptionHeaderId, value.id, this.currentUser.userName).subscribe(data => {
              this.getMerchandiseReception(value.purchaseOrderHeaderId);
              this.getMerchandiseReceptionDetail();
              this.toastr.success(`Laa Mercancia se a baorrado correctamente`);
            },
            error => {
              this.toastr.error(`Algo Salio mal en el servicio`);
            });
        }
    });
  }

  detailItem(event): void {
    this.openModal(event);
  }

  openModal(data): void {
    this.getMerchandiseReceptionDetail();
    this.ref = this.dialogService.open(MerchandiseReceptionDetailModalComponent, {
      data,
      header: 'Detalle de Recepción de Mercancía',
      width: '65%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });
  }

  openModalReception(data): void {
    this.ref = this.dialogService.open(MerchandiseReceptionArticleModalComponent, {
      data,
      header: 'Recepcionar Artículo',
      width: '65%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (result === 1) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Artículo recepcionado correctamente.'
        });
      }
    });
  }

  editItem(event): void {
    this.openModalReception(event);
  }

}
