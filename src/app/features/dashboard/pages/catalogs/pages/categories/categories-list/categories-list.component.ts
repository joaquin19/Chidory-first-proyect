import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { BusinessUnitService } from '../../../services/business-unit.service';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  public ref: DynamicDialogRef;

  public tableList: TableListComponent;

  public headers: any;
  public listBusinessUnit: any;
  public loadingTable: boolean;
  public currentUser: any;

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public businessUnitService: BusinessUnitService,
    private toastr: ToastrService
  ) {
    this.headers = [];
    this.listBusinessUnit = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripción' }
    ];

    this.getBusinessUnits();
  }

  refreshData(): void {
    this.getBusinessUnits();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Listado de Categorías`, true, headersExcel);
  }

  getBusinessUnits(): void {
    this.businessUnitService.getBusinessUnits().subscribe(
      data => {
        this.listBusinessUnit = data;
      });
  }

  editItem(event): void {
    const data = {
      category: { ...event },
      header: 'Editar Categoría',
      action: Action.Edit
    };
    this.openModal(data);
  }

  newCategory(): void {
    const data = {
      category: {},
      header: 'Nueva Categoría',
      action: Action.Create
    };
    this.openModal(data);
  }

  openModal(data): void {
    this.ref = this.dialogService.open(CategoriesFormComponent, {
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
        this.getBusinessUnits();
      }
    });
  }

  deleteItem(event): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la categoría <strong>${event.name}</strong>?`,
      header: 'Borrar Categoría',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.deleteBusinessUnit(event.id);
      }
    });
  }

  deleteBusinessUnit(businessUnitId): void {
    this.businessUnitService.deleteBusinessUnit(businessUnitId, this.currentUser.userName).subscribe(
      data => {
        this.toastr.success('Categoría eliminada correctamente.');
        this.refreshData();
      },
      error => {
        this.toastr.error(error.message);
      });
  }

}
