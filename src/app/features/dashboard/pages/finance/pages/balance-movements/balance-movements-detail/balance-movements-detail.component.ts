import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Action } from '../../../../../../../shared/enums/action';
import { BalanceMovementsDetailService } from '../../../service/balance-movements-detail.service';
import { BalanceMovementsService } from '../../../service/balance-movements.service';
import { FormatColumn } from '../../../../../../../shared/enums/format-column';
import * as moment from 'moment';

@Component({
  selector: 'app-balance-movements-detail',
  templateUrl: './balance-movements-detail.component.html',
  styleUrls: ['./balance-movements-detail.component.scss']
})
export class BalanceMovementsDetailComponent implements OnInit {

  public listBalanceMovement: any;
  public balanceMovement: any;
  public listBalanceMovementDetail: any;
  public titleHeader: string;

  public cols: any;
  public itemsPage: any;
  public filterGrid: any;
  public action: Action;
  public data: any;

  constructor(
    private toastr: ToastrService,
    private balanceMovementHeaderService: BalanceMovementsService,
    private balanceMovementDetailService: BalanceMovementsDetailService,
    public config: DynamicDialogConfig,
  ) {
    this.balanceMovement = [];
    this.listBalanceMovementDetail = [];
    this.listBalanceMovement = [];
    this.data = {};
  }

  ngOnInit(): void {
    this.data = this.config.data;
    this.cols = [
      { field: 'orderNumber', header: 'Orden', width: 'col-w md'},
      { field: 'movementDate', header: 'Fecha', width: 'col-w md' },
      { field: 'concept', header: 'Concepto', width: 'col-w md' },
      { field: 'balanceMovementTypeName', header: 'Tipo Movimiento', width: 'col-w lg' },
      { field: 'amount', header: 'Monto', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'balance', header: 'Saldo', width: 'col-w md', format: FormatColumn.Currency }
    ];
    this.showForm();
  }

  showForm(): void {
    this.titleHeader = 'Detalle de Movimientos de Saldos';
    this.getBalanceMovementByIdAccountBankId(this.config.data.id, this.config.data.accountBankId);
  }

  getBalanceMovementByIdAccountBankId(balanceMovementId, accountBankId): void {
    this.balanceMovementHeaderService.getBalanceMovementByIdAccountBankId(balanceMovementId, accountBankId).subscribe(
      data => {
        this.balanceMovement = data;
        this.getBalanceMovementDetailByHeaderId(this.balanceMovement.id);
      });
  }

  getBalanceMovementDetailByHeaderId(balanceMovementId): void {
    this.balanceMovementDetailService.getBalanceMovementDetailByHeaderId(balanceMovementId).subscribe(
      data => {
        this.listBalanceMovementDetail = data;
        this.listBalanceMovementDetail.map(o => o.movementDate = moment(o.movementDate, 'DD-MM-YYYY HH:mm:ss').format('YYYY/MM/DD'));
      });
  }

}
