import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { AccountBanksService } from '@app/features/dashboard/pages/catalogs/services';
import { BalanceMovementType } from '@app/shared/enums/balance-movement-type';
import { Template } from '@app/shared/enums/template';
import { DownloadFileService } from '@app/shared/services/download-file.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FormatColumn } from '../../../../../../../shared/enums/format-column';
import { BalanceMovementsService } from '../../../service/balance-movements.service';
import xlsxParser from 'xlsx-parse-json';
import { Action } from '@app/shared/enums';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-balance-movements-form',
  templateUrl: './balance-movements-form.component.html',
  styleUrls: ['./balance-movements-form.component.scss']
})
export class BalanceMovementsFormComponent implements OnInit {

  public mode: string;
  public filterPlaceholder: string;
  public submitted: boolean;
  public titleHeader: string;
  public listHeaders: any;
  public listAccountsBank: any;
  public listBalanceMovement: any;
  public listMovement: any;
  public balanceMovement: any;
  public maxLengthDescription: number;
  public pageRedirect: string;
  public currentUser: any;
  public typesFiles: string[];
  public nameFile: string;
  public balanceMovementType: any;
  public template: any;
  public action: Action;
  public formBalanceMovement: any;
  public accountBankObj: any;

  public cols: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private balanceMovementService: BalanceMovementsService,
    private accountBankService: AccountBanksService,
    private downloadFileService: DownloadFileService,
  ) {
    this.pageRedirect = 'dashboard/finance/balance-movements';
    this.balanceMovementType = BalanceMovementType;
    this.submitted = false;
    this.titleHeader = '';
    this.listHeaders = [];
    this.listAccountsBank = [];
    this.listBalanceMovement = [];
    this.listMovement = [];
    this.balanceMovement = {
      id: 0,
      name: '',
      description: '',
      accountBankId: null,
      unitMeasureName: '',
      code: '',
      unitPrice: null,
      dimension: null,
      tax: {}
    };
    this.typesFiles = ['.xlsx'];
    this.template = Template;
    this.nameFile = 'Platilla_Movimientos_Saldos.xlsx';

  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.cols = [
      { field: 'OrderNumber', header: 'Orden', width: 'col-w md' },
      { field: 'MovementDate', header: 'Fecha', width: 'col-w md', fromat: FormatColumn.Date },
      { field: 'Concept', header: 'Concepto', width: 'col-w md' },
      { field: 'BalanceMovementTypeName', header: 'Tipo Movimiento', width: 'col-w xxl' },
      { field: 'Amount', header: 'Monto', width: 'col-w md', format: FormatColumn.Currency },
      { field: 'Balance', header: 'Saldo', width: 'col-w md', format: FormatColumn.Currency }
    ];
    this.showForm();
  }

  onChange(event): void {
    if (event.currentFiles.length > 1) {
      this.toastr.error('error');
      return;
    }

    let fileExtension = '';

    for (const files of event.currentFiles) {
      fileExtension = (files.name.substr(files.name.lastIndexOf('.'))).toLowerCase();
      if (this.typesFiles.indexOf(fileExtension) === -1) {
        this.toastr.warning(`Solo se permiten archivos de tipo ${this.typesFiles}`);
        return;
      }
    }

    const file = event.currentFiles[0];

    const typeSheet = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (file.type === typeSheet) {
      xlsxParser.onFileSelection(file).then(data => {

        if (data.Sheet1 != null && data?.Sheet1.length !== 0) {
          this.listMovement = data;
          this.listBalanceMovement = data?.Sheet1;
          this.listBalanceMovement.forEach(element => {
            element.Amount = (element.Cargo > 0) ? parseFloat(element.Cargo) : parseFloat(element.Abono);
            element.BalanceMovementTypeId = (element.Cargo > 0) ? this.balanceMovementType.Charge : this.balanceMovementType.Credit;
            element.BalanceMovementTypeName = (element.Cargo > 0) ? 'Cargo' : 'Abono';
            element.Balance = parseFloat(element.Saldo);
            element.MovementDate = moment(element.Date).format('YYYY-MM-DD');
          });
        } else {
          this.toastr.warning('El Documento no es una lista de movimientos de Saldos');
        }
      });
    } else {
      this.toastr.warning(`Solo se permiten archivos de tipo ${this.typesFiles}`);
    }
  }

  showForm(): void {
    this.titleHeader = 'Carga de Movimientos de Saldos';
    switch (this.action) {
      case Action.Create:
        this.balanceMovement = {
          id: 0,
          name: '',
          description: '',
          accountBankId: null,
          articleTypeName: '',
          unitMeasureId: null,
          unitMeasureName: '',
          code: '',
          unitPrice: null,
          dimension: null
        };
        break;
    }

    this.getAccountsBank();
  }

  getAccountsBank(): void {
    this.accountBankService.getAccountBanks().subscribe(
      data => {
        this.listAccountsBank = data;
      });
  }

  changeAccountBank(event): void {
    this.accountBankObj = event.value;
  }

  onRemove(event): void {
    this.listBalanceMovement = [];
  }

  saveForm(): void {

    this.submitted = true;

    const balanceMovementSave: any = {};

    balanceMovementSave.AccountBankId = this.accountBankObj;
    balanceMovementSave.CreateBy = this.currentUser.userName;
    balanceMovementSave.CaptureDate = this.listBalanceMovement[this.listBalanceMovement.length - 1].MovementDate;
    balanceMovementSave.Balance = this.listBalanceMovement[this.listBalanceMovement.length - 1].Saldo;
    balanceMovementSave.BalanceMovementDetail = this.listBalanceMovement;

    this.balanceMovementService.saveBalanceMovement(balanceMovementSave).subscribe(data => {
      this.toastr.success('Movimientos de saldo guardados correctamente.');
      this.router.navigate([this.pageRedirect]);
    }, error => {
      this.toastr.error(error.message);
    });
  }

  downloadTemplate(): void {
    this.downloadFileService.getTemplate(this.template.TemplateBalanceMovement).subscribe(
      data => {
        console.log(data);
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, this.nameFile);
      });
  }

}



