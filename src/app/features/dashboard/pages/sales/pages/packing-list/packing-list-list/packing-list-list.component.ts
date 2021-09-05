import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { TableListComponent } from '@app/shared/components/table-list/table-list.component';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { PackingListHeaderService } from '../../../services';
import { PackingListDetailFormComponent } from '../packing-list-detail-form/packing-list-detail-form.component';
import { FormatColumn, PackingListStatus } from '@app/shared/enums';

@Component({
  selector: 'app-packing-list-list',
  templateUrl: './packing-list-list.component.html',
  styleUrls: ['./packing-list-list.component.scss']
})
export class PackingListListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public headers: any;
  public listPackingLists: any;
  public loadingTable: boolean;
  public ref: DynamicDialogRef;
  public currentUser: any;
  public packingListStatus = PackingListStatus;

  constructor(
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private packingListHeaderService: PackingListHeaderService,
    private toastr: ToastrService
  ) {
    this.headers = [];
    this.listPackingLists = [];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headers = [
      { width: 'col-w md', field: 'folio', header: 'Folio' },
      { width: 'col-w xl', field: 'customerName', header: 'Cliente' },
      { width: 'col-w md', field: 'packingListStatusName', header: 'Estatus' },
      { width: 'col-w xl', field: 'createBy', header: 'Creado Por' },
      { width: 'col-w xl', field: 'createdOn', header: 'Fecha Creación', format: FormatColumn.Date }
    ];

    this.getPackingLists();
  }

  getPackingLists(): void {
    this.packingListHeaderService.getPackingLists(this.currentUser.userName).subscribe(
      data => {
        this.listPackingLists = data;
        this.listPackingLists.map(element => (
          element.edit = (element.packingListStatusId === this.packingListStatus.Created
            || element.statusId === this.packingListStatus.Rejected) ? true : false,
          element.delete = (element.packingListStatusId === this.packingListStatus.Created
            || element.packingListStatusId === this.packingListStatus.Rejected) ? true : false,
          element.createdOn = moment(element.createdOn, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')
        ));
      });
  }

  refreshData(): void {
    this.getPackingLists();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de PackingList`, true, headersExcel);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  deleteItem(value): void {
    this.confirmationService.confirm({
      message: `Esta seguro de eliminar el Packing List <strong>${value.folio}</strong>`,
      header: 'Eliminar Packing List',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.packingListHeaderService.deletePackingList(value.id, this.currentUser.userName).subscribe(
          data => {
            this.toastr.success(`El Packing List <strong>${value.folio}</strong> se a eliminado correctamente`);
            this.getPackingLists();
          });
      }
    });
  }

  detailItem(data): void {
    const dataItem = { ...data };
    this.ref = this.dialogService.open(PackingListDetailFormComponent, {
      data: dataItem,
      header: `Detalle de Packing List - Folio: ${dataItem.folio}`,
      width: '95%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
    });
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/sales/packing-list/editPackingList/${event.id}`]);
  }


}
