import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { TableListComponent } from '@app/shared/components/table-list/table-list.component';
import { Action, FormatColumn } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BalanceMovementsDetailComponent } from '../balance-movements-detail/balance-movements-detail.component';
import { BalanceMovementsService } from '../../../service/balance-movements.service';
import * as moment from 'moment';

@Component({
  selector: 'app-balance-movements-list',
  templateUrl: './balance-movements-list.component.html',
  styleUrls: ['./balance-movements-list.component.scss']
})
export class BalanceMovementsListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public listBalanceMovements: any;
  public ref: DynamicDialogRef;
  public listBalanceMovementsCreated: any;
  public listBalanceMovementsPendingAuthorize: any;
  public cols: any;
  public currentUser: any;
  public actionForm = Action;

  constructor(
    public dialogService: DialogService,
    private balanceMovementHeaderService: BalanceMovementsService,
    private toastr: ToastrService
  ) {
    this.cols = [];
    this.listBalanceMovements = [];
    this.listBalanceMovementsCreated = [];
    this.listBalanceMovementsPendingAuthorize = [];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.cols = [
      { field: 'folio', header: 'Folio', width: 'col-w md' },
      { field: 'bankName', header: 'Banco', width: 'col-w md' },
      { field: 'accountBankName', header: 'Cuenta', width: 'col-w md' },
      { field: 'currencyName', header: 'Moneda', width: 'col-w md' },
      { field: 'lastModification', header: 'Fecha', width: 'col-w md' },
      { field: 'captureDate', header: 'Fecha Captura', width: 'col-w lg' },
      { field: 'balance', header: 'Saldo', width: 'col-w md', format: FormatColumn.Currency }
    ];
    this.getBalanceMovements();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.cols) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Saldos`, true, headersExcel);
  }

  getBalanceMovements(): void {
    this.balanceMovementHeaderService.getBalanceMovements().subscribe(
      data => {
        this.listBalanceMovements = data;
        this.listBalanceMovements.map(o => o.lastModification = moment(o.lastModification, 'DD-MM-YYYY HH:mm:ss').format('YYYY/MM/DD'));
        this.listBalanceMovements.map(o => o.captureDate = moment(o.captureDate, 'DD-MM-YYYY HH:mm:ss').format('YYYY/MM/DD'));
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  refreshData(): void {
    this.getBalanceMovements();
  }

  detailItem(event): void {
    this.openModal(event);
  }

  openModal(data): void {
    this.ref = this.dialogService.open(BalanceMovementsDetailComponent, {
      data,
      header: 'Detalle del Saldo',
      width: '95%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });
  }

}
