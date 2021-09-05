import { Component, OnInit, ViewChild } from '@angular/core';
import { TableListComponent } from '../../../../../../../shared/components/table-list/table-list.component';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PurchaseOrdersDetailModalComponent } from '../purchase-orders-detail-modal/purchase-orders-detail-modal.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { PurchaseOrderHeaderService } from '../../../services';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { FormatColumn, PurchaseOrderStatus } from '@app/shared/enums';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.scss']
})
export class PurchaseOrdersListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public ref: DynamicDialogRef;

  public headers: any;
  public headersDetail: any;
  public listPurchaseOrders: any;
  public listDetailData: any;
  public loadingTable: boolean;
  public purchaseOrder: any;
  public detailDialog: boolean;
  public currentUser: any;
  public purchaseOrderStatus = PurchaseOrderStatus;

  constructor(
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private router: Router,
    public purchaseOrderHeaderService: PurchaseOrderHeaderService
  ) {
    this.headers = [];
    this.headersDetail = [];
    this.listPurchaseOrders = [];
    this.listDetailData = [];
    this.loadingTable = false;
    this.purchaseOrder = {};
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'folio', header: 'Folio', width: 'col-w md' },
      { field: 'plantName', header: 'Planta', width: 'col-w md' },
      { field: 'statusName', header: 'Estatus', width: 'col-w md' },
      { field: 'businessUnitName', header: 'Unidad de Negocio', width: 'col-w xl' },
      { field: 'costCenterName', header: 'Centro de Costos', width: 'col-w xl' },
      { field: 'costTypeName', header: 'Costo', width: 'col-w xl' },
      { field: 'supplierName', header: 'Proveedor', width: 'col-w xxxl' },
      { field: 'detail', header: 'Detalle', width: 'col-w xl' },
      { field: 'quantity', header: 'Cantidad', width: 'col-w md' },
      { field: 'subTotal', header: 'SubTotal', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'iva', header: 'IVA', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'retentionISR', header: 'Retención ISR', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'total', header: 'Total', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'currencyCode', header: 'Moneda', width: 'col-w md' },
      { field: 'createBy', header: 'Creado Por', width: 'col-w lg' },
      { field: 'createdOn', header: 'Fecha Creación', width: 'col-w lg' }
    ];

    this.headersDetail = [
      { field: 'code', header: 'NO. PARTE', width: 'col-w md' },
      { field: 'description', header: 'DESCRIPCIÓN', width: 'col-w xxl' },
      { field: 'quantity', header: 'CANTIDAD', width: 'col-w md' },
      { field: 'unitMeasureName', header: 'U/M', width: 'col-w sm' },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', width: 'col-w lg', format: FormatColumn.Currency },
      { field: 'total', header: 'PRECIO TOTAL', width: 'col-w md', format: FormatColumn.Currency }
    ];

    this.getData();
  }

  getData(): void {
    this.purchaseOrderHeaderService.getPurchaseOrders(this.currentUser.userName).subscribe(
      data => {
        this.listPurchaseOrders = data;
        this.listPurchaseOrders.forEach(element => {
          element.edit = (element.statusId === this.purchaseOrderStatus.Created
            || element.statusId === this.purchaseOrderStatus.Rejected) ? true : false;
          element.sendAuthorize = (element.statusId === this.purchaseOrderStatus.Created
            || element.statusId === this.purchaseOrderStatus.Rejected) ? true : false;
          element.delete = (element.statusId === this.purchaseOrderStatus.Created
            || element.statusId === this.purchaseOrderStatus.Rejected) ? true : false;
        });
      });
  }

  refreshData(): void {
    this.getData();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Órdenes de Compra`, true, headersExcel);
  }

  openNew(): void {
    this.detailDialog = true;
  }

  hideDialog(): void {
    this.detailDialog = false;
  }

  detailItem(event): void {
    this.openModal(event);
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/purchases/purchase-orders/editPurchaseOrder/${event.id}`]);
  }

  deleteItem(event): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la orden de compra <strong>${event.folio}</strong>?`,
      header: 'Borrar Orden de Compra',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.deletePurchaseOrder(event.id);
      }
    });
  }

  deletePurchaseOrder(purchaseOrderId): void {
    this.purchaseOrderHeaderService.deletePurchaseOrder(purchaseOrderId, this.currentUser.userName).subscribe(
      data => {
        this.toastr.success('Orden de compra eliminada correctamente.');
        this.refreshData();
      });
  }

  sendAuthorizeItem(event): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de enviar a autorizar la orden de compra <strong>${event.folio}</strong>?`,
      header: 'Enviar a Autorización Orden de Compra',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-send',
      acceptButtonStyleClass: 'p-button-success',
      rejectVisible: false,
      accept: () => {
        this.sendAuthorization(event.id);
      }
    });
  }

  sendAuthorization(id): void {
    const purchaseOrderSave: any = {};
    purchaseOrderSave.id = id;
    purchaseOrderSave.createBy = this.currentUser.userName;

    this.purchaseOrderHeaderService.updatePurchaseOrderSendAuthorization(purchaseOrderSave).subscribe(
      data => {
        this.toastr.success('Orden de compra enviada a autorizar correctamente.');
        this.refreshData();
      });
  }

  openModal(data): void {
    this.ref = this.dialogService.open(PurchaseOrdersDetailModalComponent, {
      data,
      header: 'Detalle de Orden de Compra',
      width: '95%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });
  }

}
