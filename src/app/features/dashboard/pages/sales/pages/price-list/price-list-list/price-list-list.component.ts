import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import * as moment from 'moment';
import { ConfirmationService, ConfirmEventType, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from '../../../../../../../shared/components/table-list/table-list.component';
import { PriceListDetailComponent } from '../price-list-detail/price-list-detail.component';
import { PriceHeaderService } from '../../../services/price-header.service';
import { ToastrService } from 'ngx-toastr';
import { PriceListStatus } from '../../../../../../../shared/enums/price-list-status';

@Component({
  selector: 'app-price-list-list',
  templateUrl: './price-list-list.component.html',
  styleUrls: ['./price-list-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class PriceListListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colPriceList: any;
  public listPriceList: any;
  public loadingTable: boolean;
  public ref: DynamicDialogRef;
  public currentUser: any;

  constructor(
    private router: Router,
    private priceListService: PriceHeaderService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private toastr: ToastrService,
    public messageService: MessageService
   ) {
    this.colPriceList = [];
    this.listPriceList = [];
    this.loadingTable = false;
   }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.colPriceList = [
      { field: 'name', header: 'Nombre', width: 'col-w md' },
      { field: 'priceTypeName', header: 'Cliente/Proyecto', width: 'col-w lg'},
      { field: 'customerName', header: 'Cliente', width: 'col-w md'},
      { field: 'projectName', header: 'Proyecto', width: 'col-w md'},
      { field: 'startDate', header: 'Fecha de Inicio', width: 'col-w lg'},
      { field: 'endDate', header: 'Fecha de Fin', width: 'col-w lg'},
      { field: 'currencyCode', header: 'Moneda', width: 'col-w md'},
      { field: 'priceStatusName', header: 'Estatus', width: 'col-w md'},
      { field: 'createBy', header: 'Creado Por', width: 'col-w lg'},
      { field: 'createdOn', header: 'Fecha de Creación', width: 'col-w xl'}
    ];

    this.getPrices();
  }

  getPrices(): void {
    this.priceListService.getPrices(this.currentUser.userName).subscribe(
      data => {
        this.listPriceList = data;
        this.listPriceList.forEach(element => {
          element.edit = (element.priceStatusId === PriceListStatus.Created ||
                         element.priceStatusId === PriceListStatus.Rejected) ? true : false;
          element.sendAuthorize = (element.priceStatusId === PriceListStatus.Created ||
                         element.priceStatusId === PriceListStatus.Rejected) ? true : false;
          element.delete = (element.priceStatusId === PriceListStatus.Created ||
                         element.priceStatusId === PriceListStatus.Rejected) ? true : false;
          element.startDate = moment(element.startDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
          element.endDate = moment(element.endDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        });
      },
      error => {
      });
  }

  detailItem(data): void {
    this.ref = this.dialogService.open(PriceListDetailComponent, {
      data,
      header: 'Detalle la Lista de Precio',
      width: '95%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
    });
  }

  deleteItem(value): void {
    this.confirmationService.confirm({
        message: 'Esta Seguro de Borrar esta Lista de Precios?',
        header: 'Borrar Lista de Precios',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-danger',
        rejectVisible: false,
        accept: () => {
          this.priceListService.deletePrice(value.id, this.currentUser.userName).subscribe(
            data => {
              this.toastr.success(`La lista de preccios ${value.name} se a borrado correctamente`);
              this.getPrices();
            },
            error => {
              this.toastr.error(`Algo Salio mal en el servicio`);
            });
        }
    });
  }

  sendAuthorizeItem(event): void {
    this.confirmationService.confirm({
        message: 'Desea Enviar a Autorizacion esta Lissta de Precios?',
        header: 'Enviar Autorizacion',
        icon: 'pi pi-check-circle',
        acceptLabel: 'Si',
        acceptIcon: 'pi pi-send',
        acceptButtonStyleClass: 'p-button-success',
        rejectVisible: false,
        accept: () => {
          const priceListSave: any = {};
          priceListSave.id = event.id;
          priceListSave.createBy = event.createBy;
          this.priceListService.updatePriceListSendAuthorization(priceListSave).subscribe(
            data => {
              this.toastr.success('Lista de precios enviada a autorizar correctamente.');
              this.getPrices();
            },
            error => {
              this.toastr.error(error.message);
          });
        },
    });
  }

  refreshData(): void {
    this.getPrices();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.colPriceList) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Precios`, true, headersExcel);
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/sales/price-list/editPriceList/${event.id}`]);
  }

}
