import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { ReconciliationStatus } from '@app/shared/enums/reconciliation-status';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { ReconciliationHeaderService } from '../../../services';

@Component({
  selector: 'app-reconciliation-list',
  templateUrl: './reconciliation-list.component.html',
  styleUrls: ['./reconciliation-list.component.scss']
})
export class ReconciliationListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public headers: any;
  public listReconciliation: any;
  public loadingTable: boolean;
  public detailDialog: boolean;
  public currentUser: any;
  public reconciliationStatus = ReconciliationStatus;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public reconciliationHeaderService: ReconciliationHeaderService
  ) {
    this.headers = [];
    this.listReconciliation = [];
    this.loadingTable = false;
    this.detailDialog = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'id', header: 'Folio', width: 'col-w md' },
      { field: 'statusName', header: 'Estatus', width: 'col-w lg' },
      { field: 'supplierName', header: 'Proveedor', width: 'col-w xxxl' },
      { field: 'createBy', header: 'Creado Por', width: 'col-w lg' },
      { field: 'createdOn', header: 'Fecha Creación', width: 'col-w lg' }
    ];

    this.getData();
  }

  getData(): void {
    this.loadingTable = true;
    this.reconciliationHeaderService.getReconciliations(this.currentUser.userName).subscribe(
      data => {
        this.listReconciliation = data;
        this.listReconciliation.forEach(element => {
          element.edit = (element.reconciliationStatusId === this.reconciliationStatus.Created
            || element.reconciliationStatusId === this.reconciliationStatus.Rejected) ? true : false;
          element.sendAuthorize = (element.reconciliationStatusId === this.reconciliationStatus.Created
            || element.reconciliationStatusId === this.reconciliationStatus.Rejected) ? true : false;
          element.delete = (element.reconciliationStatusId === this.reconciliationStatus.Created
            || element.reconciliationStatusId === this.reconciliationStatus.Rejected) ? true : false;
        });
        this.loadingTable = false;
      },
      error => {
        this.toastr.error(error.message);
        this.loadingTable = false;
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
    this.tableList.exportExcel(`Lista de Conciliaciones`, true, headersExcel);
  }

  detailItem(event): void {
    this.router.navigate([`/dashboard/purchases/reconciliation/detailReconciliation/${event.id}`]);
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/purchases/reconciliation/editReconciliation/${event.id}`]);
  }

  deleteItem(event): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la conciliación <strong>${event.id}</strong>?`,
      header: 'Borrar Conciliación',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.deleteReconciliation(event.id);
      }
    });
  }

  deleteReconciliation(purchaseOrderId): void {
    this.reconciliationHeaderService.deleteReconciliation(purchaseOrderId, this.currentUser.userName).subscribe(
      data => {
        this.toastr.success('Conciliación eliminada correctamente.');
        this.refreshData();
      });
  }

  sendAuthorizeItem(event): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de enviar a autorizar la conciliación <strong>${event.id}</strong>?`,
      header: 'Enviar a Autorización Conciliación',
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
    const reconciliationSave: any = {};
    reconciliationSave.id = id;
    reconciliationSave.createBy = this.currentUser.userName;

    this.reconciliationHeaderService.updateReconciliationSendAuthorization(reconciliationSave).subscribe(
      data => {
        this.toastr.success('Conciliación enviada a autorizar correctamente.');
        this.refreshData();
      });
  }

}
