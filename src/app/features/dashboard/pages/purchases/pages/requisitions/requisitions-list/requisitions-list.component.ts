import { Component, OnInit, ViewChild } from '@angular/core';
import { TableListComponent } from '../../../../../../../shared/components/table-list/table-list.component';
import { DbType } from '../../../../../../../shared/enums/db-type.enum';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RequisitionsDetailFormComponent } from '../requisitions-detail-form/requisitions-detail-form.component';
import { RequisitionHeaderService } from '../../../services';
import { UserAuthenticationModel } from '../../../../../../../core/models/auth.model';
import { FormatColumn, RequisitionStatus } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requisitions-list',
  templateUrl: './requisitions-list.component.html',
  styleUrls: ['./requisitions-list.component.scss']
})
export class RequisitionsListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public ref: DynamicDialogRef;

  public headers: any;
  public headersDetail: any;
  public listData: any;
  public listDetailData: any;
  public loadingTable: boolean;
  public requisition: any;
  public detailDialog: boolean;
  public currentUser: any;
  public requisitionStatus = RequisitionStatus;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private requisitionHeaderService: RequisitionHeaderService
  ) {
    this.headers = [];
    this.headersDetail = [];
    this.listData = [];
    this.listDetailData = [];
    this.loadingTable = false;
    this.requisition = {};
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headers = [
      { field: 'folio', header: 'Folio', width: 'col-w md' },
      { field: 'statusName', header: 'Estatus', width: 'col-w lg' },
      { field: 'businessUnitName', header: 'Unidad de Negocio', width: 'col-w xl' },
      { field: 'costCenterName', header: 'Centro de Costos', width: 'col-w xl' },
      { field: 'supplierName', header: 'Proveedor', width: 'col-w xxxl' },
      { field: 'subTotal', header: 'SubTotal', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'taxes', header: 'Impuestos', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'total', header: 'Total', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'createBy', header: 'Creado Por', width: 'col-w lg' },
      { field: 'createdOn', header: 'Fecha Creación', width: 'col-w lg' }
    ];

    this.getRequisitions();
  }

  getRequisitions(): void {
    this.requisitionHeaderService.getRequisitions(this.currentUser.userName).subscribe(
      data => {
        this.listData = data;
        this.listData.forEach(element => {
          element.edit = (element.statusId === this.requisitionStatus.Created
            || element.statusId === this.requisitionStatus.Rejected) ? true : false;
          element.sendAuthorize = (element.statusId === this.requisitionStatus.Created
            || element.statusId === this.requisitionStatus.Rejected) ? true : false;
          element.delete = (element.statusId === this.requisitionStatus.Created
            || element.statusId === this.requisitionStatus.Rejected) ? true : false;
        });
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  refreshData(): void {
    this.getRequisitions();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Requisiciones`, true, headersExcel);
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
    this.router.navigate([`/dashboard/purchases/requisitions/editRequisition/${event.id}`]);
  }

  openModal(data): void {
    this.ref = this.dialogService.open(RequisitionsDetailFormComponent, {
      data,
      header: 'Detalle de Requisición',
      width: '95%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

  }

  deleteItem(event): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la requisición <strong>${event.folio}</strong>?`,
      header: 'Borrar Requisición',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.deleteRequisition(event.id);
      }
    });
  }

  deleteRequisition(requisitionId): void {
    this.requisitionHeaderService.deleteRequisition(requisitionId, this.currentUser.userName).subscribe(
      data => {
        this.toastr.success('Requisición eliminada correctamente.');
        this.refreshData();
      });
  }

  sendAuthorizeItem(event): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de enviar a autorizar la requisición <strong>${event.folio}</strong>?`,
      header: 'Enviar a Autorización Requisición',
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
    const requisitionSave: any = {};
    requisitionSave.id = id;
    requisitionSave.createBy = this.currentUser.userName;

    this.requisitionHeaderService.updateRequisitionSendAuthorization(requisitionSave).subscribe(
      data => {
        this.toastr.success('Requisición enviada a autorizar correctamente.');
        this.refreshData();
      });
  }

}
