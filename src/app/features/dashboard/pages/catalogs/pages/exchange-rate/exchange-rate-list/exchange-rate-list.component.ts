import { Component, OnInit, ViewChild } from '@angular/core';
import { TableListComponent } from '../../../../../../../shared/components/table-list/table-list.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExchangeRateFormComponent } from '../exchange-rate-form/exchange-rate-form.component';
import { ExchangeRateService } from '../../../services/exchange-rate.service';
import { ToastrService } from 'ngx-toastr';
import { UserAuthenticationModel } from '@app/core/models/auth.model';

@Component({
  selector: 'app-exchange-rate-list',
  templateUrl: './exchange-rate-list.component.html',
  styleUrls: ['./exchange-rate-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class ExchangeRateListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public ref: DynamicDialogRef;
  public headers: any;
  public listData: any;
  public loadingTable: boolean;
  public editDialog: boolean;
  public newDialog: boolean;
  public exchangeRate: any;
  public listCurrencies: any;
  public currentUser: any;

  constructor(
    private confirmationService: ConfirmationService,
    private exchangeRateService: ExchangeRateService,
    public dialogService: DialogService,
    private toastr: ToastrService,
    public messageService: MessageService
  ) {
    this.headers = [];
    this.listData = [];
    this.loadingTable = false;
    this.editDialog = false;
    this.newDialog = false;
    this.exchangeRate = {};
    this.listCurrencies = [];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'exchangeRateValue', header: 'Tipo de Cambio', width: 'col-w xl' },
      { field: 'changeDay', header: 'Día de Cambio', width: 'col-w xl' }
    ];
    this.getData();
  }

  getData(): void {
    this.exchangeRateService.getExchangeRates().subscribe(
      data => {
        this.listData = data;
        this.loadingTable = false;
      },
      error => {
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
    this.tableList.exportExcel(`Lista de Tipos de Cambio`, true, headersExcel);
  }

  saveArticle(): void {
    this.newDialog = false;
    this.editDialog = false;
  }

  openNew(): void {
    const data = {
      header: 'Nuevo Tipo de Cambio',
      type: 1
    };
    this.openModal(data);
  }

  editItem(event): void {
    event.header = 'Editar Tipo de Cambio';
    event.type = 2;
    this.openModal(event);
  }

  deleteItem(value): void {
    this.confirmationService.confirm({
      message: 'Esta Seguro de Borrar este Tipo de Cambio?',
      header: 'Borrar Tipo de Cambio',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.exchangeRateService.deleteExchangeRate(value.id, this.currentUser.userName).subscribe(
          data => {
            this.toastr.success(`El Tipo de Cambio se borrado correctamente`);
            this.getData();
          },
          error => {
            this.toastr.error(`Algo Salio mal en el servicio`);
          });
      }
    });
  }

  openModal(data): void {
    this.ref = this.dialogService.open(ExchangeRateFormComponent, {
      data,
      header: data.header,
      width: '50%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (result === 1) {
        if (data.type === 1) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Tipo de Cambio guardado correctamente.'
          });
        } else if (data.type === 2) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Tipo de Cambio editado correctamente.'
          });
        }
        this.refreshData();
      }
    });
  }

}
