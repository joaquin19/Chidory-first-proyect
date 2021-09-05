import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { RemissionService } from '../../../services';
import { RemissionDetailComponent } from '../remission-detail/remission-detail.component';

@Component({
  selector: 'app-remission-list',
  templateUrl: './remission-list.component.html',
  styleUrls: ['./remission-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class RemissionListComponent implements OnInit, OnDestroy {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colRemission: any;
  public listRemission: any;
  public loadingTable: boolean;
  public ref: DynamicDialogRef;
  public currentUser: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private remissionService: RemissionService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public messageService: MessageService
   ) {
    this.colRemission = [];
    this.listRemission = [];
    this.loadingTable = false;
   }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.colRemission = [
      { width: 'col-w md', field: 'folio', header: 'Folio'},
      { width: 'col-w lg', field: 'noOrder', header: 'No. Orden'},
      { width: 'col-w xl', field: 'noOrderCustomer', header: 'No. Orden Cliente'},
      { width: 'col-w md', field: 'shippingAddress', header: 'Enviar A'},
      { width: 'col-w xl', field: 'shippingDate', header: 'Fecha de Entrega'},
      { width: 'col-w md', field: 'orderStatusName', header: 'Estatus'},
      { width: 'col-w xl', field: 'createBy', header: 'Creado Por'},
      { width: 'col-w xl', field: 'createdOn', header: 'Fecha Creación'},
      { width: 'col-w xxl', field: 'observations', header: 'Observaciones'}
    ];
    this.getRemission();
  }

  refreshData(): void {
    this.getRemission();
  }

  getRemission(): void {
    this.remissionService.getRemissions(this.currentUser.userName).subscribe(
      data => {
        data.map(order => (
          order.shippingDate = moment(order.shippingDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')
        ));
        this.listRemission = data;
      },
      error => {
      });
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.colRemission) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Remisiones`, true, headersExcel);
  }

  ngOnDestroy(): void {
    if (this.ref) {
        this.ref.close();
    }
  }

  deleteItem(value): void {
    this.confirmationService.confirm({
        message: 'Esta Seguro de Borrar esta Remision?',
        header: 'Borrar Remision',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-danger',
        rejectVisible: false,
        accept: () => {
          this.remissionService.deleteOrder(value.id, this.currentUser.userName).subscribe(
            data => {
              this.toastr.success(`La lista de Remisiones ${value.name} se a borrado correctamente`);
              this.getRemission();
            },
            error => {
              this.toastr.error(`Algo Salio mal en el servicio`);
            });
        }
    });
  }

  detailItem(data): void {
    this.ref = this.dialogService.open(RemissionDetailComponent, {
      data,
      header: 'Detalle de  Remision',
      width: '95%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
    });
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/sales/remission/editRemission/${event.id}`]);
  }

}
