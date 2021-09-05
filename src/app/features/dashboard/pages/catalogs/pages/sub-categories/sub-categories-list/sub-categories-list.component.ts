import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { CostCenterService } from '../../../services/cost-center.service';
import { SubCategoriesFormComponent } from '../sub-categories-form/sub-categories-form.component';

@Component({
  selector: 'app-sub-categories-list',
  templateUrl: './sub-categories-list.component.html',
  styleUrls: ['./sub-categories-list.component.scss']
})
export class SubCategoriesListComponent implements OnInit {

  public ref: DynamicDialogRef;

  public tableList: TableListComponent;

  public headers: any;
  public listCostCenter: any;
  public loadingTable: boolean;
  public currentUser: any;

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public costCenterService: CostCenterService,
    private toastr: ToastrService
  ) {
    this.headers = [];
    this.listCostCenter = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripción' },
      { field: 'businessUnitName', header: 'Nombre Categoría' },
    ];

    this.getCostCenters();
  }

  refreshData(): void {
    this.getCostCenters();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Listado de Sub Categorías`, true, headersExcel);
  }

  getCostCenters(): void {
    this.costCenterService.getCostCenters().subscribe(
      data => {
        this.listCostCenter = data;
      });
  }

  editItem(event): void {
    const data = {
      subCategory: { ...event },
      header: 'Editar Sub Categoría',
      action: Action.Edit
    };
    this.openModal(data);
  }

  newCategory(): void {
    const data = {
      subCategory: {},
      header: 'Nueva Sub Categoría',
      action: Action.Create
    };
    this.openModal(data);
  }

  openModal(data): void {
    this.ref = this.dialogService.open(SubCategoriesFormComponent, {
      data,
      header: data.header,
      width: '65%',
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

  deleteItem(event): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la sub categoría <strong>${event.name}</strong>?`,
      header: 'Borrar Sub Categoría',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.deleteCostCenter(event.id);
      }
    });
  }

  deleteCostCenter(costCenterId): void {
    this.costCenterService.deleteCostCenter(costCenterId, this.currentUser.userName).subscribe(
      data => {
        this.toastr.success('Sub Categoría eliminada correctamente.');
        this.refreshData();
      },
      error => {
        this.toastr.error(error.message);
      });
  }

}
