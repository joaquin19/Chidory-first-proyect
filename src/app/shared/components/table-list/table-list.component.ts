import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import * as moment from 'moment';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {

  @Input() showSelection: boolean;
  @Input() dataKey: any;
  @Input() headers: any;
  @Input() data: any;
  @Input() loading: boolean;
  @Input() rowHover: boolean;
  @Input() rows: number;
  @Input() paginator: boolean;
  @Input() rowsPerPageOptions: Array<number>;
  @Input() showActions: boolean;
  @Input() edit: boolean;
  @Input() delete: boolean;
  @Input() detail: boolean;
  @Input() sendAuthorize: boolean;
  @Input() authorize: boolean;
  @Input() reject: boolean;
  @Input() order: boolean;
  @Input() preInvoice: boolean;
  @Input() invoice: boolean;

  @Output() editItem = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  @Output() detailItem = new EventEmitter();
  @Output() sendAuthorizeItem = new EventEmitter();
  @Output() authorizeItem = new EventEmitter();
  @Output() rejectItem = new EventEmitter();
  @Output() orderItem = new EventEmitter();
  @Output() selectedItems = new EventEmitter();

  @ViewChild('dt', { static: false })
  public dt: Table;

  public selected: any;

  constructor(
    private primengConfig: PrimeNGConfig
  ) {
    this.showSelection = false;
    this.headers = [];
    this.data = [];
    this.loading = false;
    this.rowHover = true;
    this.rows = 10;
    this.paginator = true;
    this.rowsPerPageOptions = [5, 10, 25, 50];
    this.primengConfig.ripple = true;
    this.showActions = false;
    this.edit = false;
    this.delete = false;
    this.detail = false;
    this.sendAuthorize = false;
    this.authorize = false;
    this.reject = false;
    this.order = false;
    this.selected = [];
  }

  ngOnInit(): void {
  }

  public exportExcel(fileName: string, customHeader: boolean = false, headers: any = []): void {
    import('xlsx').then(xlsx => {
      const dataExport = [...this.data];

      if (customHeader) {
        for (const item of dataExport) {
          const properties = Object.getOwnPropertyNames(item);
          for (const key in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, key)) {
              const element = properties[key];
              if (!headers.hasOwnProperty(element)) {
                delete item[`${element}`];
              }
            }
          }
        }
        dataExport.unshift(headers);
      }

      const worksheet = xlsx.utils.json_to_sheet(dataExport, { skipHeader: true });
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, fileName);
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, `${fileName}_${moment().format('YYYY-MM-DD')}${EXCEL_EXTENSION}`);
    });
  }

  public handleEdit(item): void {
    this.editItem.emit(item);
  }

  public handleDelete(item): void {
    this.deleteItem.emit(item);
  }

  public handleDetail(item): void {
    this.detailItem.emit(item);
  }

  public handleSendAuthorize(item): void {
    this.sendAuthorizeItem.emit(item);
  }

  public handleAuthorize(item): void {
    this.authorizeItem.emit(item);
  }

  public handleReject(item): void {
    this.rejectItem.emit(item);
  }

  public handleOrder(item): void {
    this.orderItem.emit(item);
  }

  public handleSelected(): void {
    this.selectedItems.emit(this.selected);
  }

  public refreshTable(): void {
    this.dt.toggleRowsWithCheckbox(null, false);
  }

}
