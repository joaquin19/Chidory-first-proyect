import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { MerchandiseReceptionHeaderService } from '../../../services/merchandise-reception-header.service';

@Component({
  selector: 'app-merchandise-reception-list',
  templateUrl: './merchandise-reception-list.component.html',
  styleUrls: ['./merchandise-reception-list.component.scss']
})
export class MerchandiseReceptionListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public headers: any;
  public listData: any;
  public loadingTable: boolean;
  public listMerchandise: any;

  constructor(
    private merchandiseReceptionHeaderService: MerchandiseReceptionHeaderService,
    private router: Router
  ) {
    this.headers = [];
    this.listData = [];
    this.listMerchandise = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.headers = [
      { field: 'folio', header: 'Folio Orden de Compra', width: 'col-w lg' },
      { field: 'statusName', header: 'Estatus', width: 'col-w lg' },
      { field: 'receptionDate', header: 'Fecha Recepción', width: 'col-w lg' }
    ];

    this.getMerchandise();
  }

  getMerchandise(): void {
    this.merchandiseReceptionHeaderService.getMerchandiseReceptions().subscribe(
      data => {
        this.listMerchandise = data;
      });
  }

  refreshData(): void {
    this.getMerchandise();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Recepción de Mercancía`, true, headersExcel);
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/purchases/merchandise-reception/editMerchandiseReception/${event.purchaseOrderHeaderId}`]);
  }

}
