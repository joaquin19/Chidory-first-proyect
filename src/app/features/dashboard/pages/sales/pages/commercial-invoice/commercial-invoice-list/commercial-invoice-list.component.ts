import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { TableListComponent } from '@app/shared/components/table-list/table-list.component';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { CommercialInvoiceHeaderService } from '../../../services';
import { CommercialInvoiceDetailFormComponent } from '../commercial-invoice-detail-form/commercial-invoice-detail-form.component';
import { FormatColumn, CommercialInvoiceStatus } from '@app/shared/enums';

@Component({
  selector: 'app-commercial-invoice-list',
  templateUrl: './commercial-invoice-list.component.html',
  styleUrls: ['./commercial-invoice-list.component.scss']
})
export class CommercialInvoiceListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public headers: any;
  public listCommercialInvoices: any;
  public loadingTable: boolean;
  public ref: DynamicDialogRef;
  public currentUser: any;
  public commercialInvoiceStatus = CommercialInvoiceStatus;

  constructor(
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private commercialInvoiceHeaderService: CommercialInvoiceHeaderService,
    private toastr: ToastrService
  ) {
    this.headers = [];
    this.listCommercialInvoices = [];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headers = [
      { width: 'col-w md', field: 'folio', header: 'Folio' },
      { width: 'col-w xl', field: 'customerName', header: 'Cliente' },
      { width: 'col-w md', field: 'commercialInvoiceStatusName', header: 'Estatus' },
      { width: 'col-w xl', field: 'createBy', header: 'Creado Por' },
      { width: 'col-w xl', field: 'createdOn', header: 'Fecha Creación', format: FormatColumn.Date }
    ];

    this.getCommercialInvoices();
  }

  getCommercialInvoices(): void {
    this.commercialInvoiceHeaderService.getCommercialInvoices(this.currentUser.userName).subscribe(
      data => {
        this.listCommercialInvoices = data;
        this.listCommercialInvoices.map(element => (
          element.edit = (element.commercialInvoiceStatusId === this.commercialInvoiceStatus.Created
            || element.statusId === this.commercialInvoiceStatus.Rejected) ? true : false,
          element.delete = (element.commercialInvoiceStatusId === this.commercialInvoiceStatus.Created
            || element.commercialInvoiceStatusId === this.commercialInvoiceStatus.Rejected) ? true : false,
          element.createdOn = moment(element.createdOn, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')
        ));
      });
  }

  refreshData(): void {
    this.getCommercialInvoices();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Commercial Invoice`, true, headersExcel);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  deleteItem(value): void {
    this.confirmationService.confirm({
      message: `Esta seguro de eliminar el Commercial Invoice <strong>${value.folio}</strong>`,
      header: 'Eliminar Commercial Invoice',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.commercialInvoiceHeaderService.deleteCommercialInvoice(value.id, this.currentUser.userName).subscribe(
          data => {
            this.toastr.success(`El Commercial Invoice <strong>${value.folio}</strong> se a eliminado correctamente`);
            this.getCommercialInvoices();
          });
      }
    });
  }

  detailItem(data): void {
    const dataItem = { ...data };
    this.ref = this.dialogService.open(CommercialInvoiceDetailFormComponent, {
      data: dataItem,
      header: `Detalle de Commercial Invoice - Folio: ${dataItem.folio}`,
      width: '95%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
    });
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/sales/commercial-invoice/editCommercialInvoice/${event.id}`]);
  }

}
