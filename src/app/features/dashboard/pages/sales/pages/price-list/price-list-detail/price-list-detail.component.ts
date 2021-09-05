import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { PriceDetailService } from '../../../services/price-detail.service';
import { PriceHeaderService } from '../../../services/price-header.service';

@Component({
  selector: 'app-price-list-detail',
  templateUrl: './price-list-detail.component.html',
  styleUrls: ['./price-list-detail.component.scss']
})
export class PriceListDetailComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colprice: any;
  public listPrice: any;
  public priceList: any;
  public currency: string;

  constructor(
    public config: DynamicDialogConfig,
    private priceDetailService: PriceDetailService,
    private priceService: PriceHeaderService
  ) {
    this.colprice = [];
    this.listPrice = [];
    this.priceList = [];
  }

  ngOnInit(): void {
    this.colprice = [
      { width: 'col-w md', field: 'no', header: 'NO'},
      { width: 'col-w md', field: 'saleType', header: 'TIPO'},
      { width: 'col-w lg', field: 'carModel', header: 'MODELO'},
      { width: 'col-w lg', field: 'carModelDr', header: 'MODELO DR'},
      { width: 'col-w lg', field: 'partNumber', header: 'NO. PARTE'},
      { width: 'col-w xl', field: 'partNumberCustomer', header: 'NO. PARTE CLIENTE'},
      { width: 'col-w lg', field: 'component', header: 'COMPONENTE'},
      { width: 'col-w xl', field: 'partName', header: 'NOMBRE DE PARTE'},
      { width: 'col-w md', field: 'material', header: 'MATERIAL'},
      { width: 'col-w md', field: 'unit', header: 'UNIDAD'},
      { width: 'col-w md', field: 'us', header: 'U/S'},
      { width: 'col-w md', field: 'option', header: 'OPCION'},
      { width: 'col-w md', field: 'taxName', header: 'IMPUESTO'},
      { width: 'col-w md', field: 'salePrice', header: 'PRECIO'}
    ];
    this.getPriceById(this.config.data.id);
  }

  getPriceById(priceById): void {
    this.priceService.getPriceById(priceById).subscribe(
      data => {
        this.priceList = data;
        this.currency = this.priceList.currencyCode + ' - ' + this.priceList.currencyName;
        this.priceList.startDate = moment(this.priceList.startDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.priceList.endDate = moment(this.priceList.endDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.getPriceDetailByHeaderId(priceById);
      });
  }

  getPriceDetailByHeaderId(priceHeaderId): void {
    this.priceDetailService.getPriceDetailByHeaderId(priceHeaderId).subscribe(
      data => {
        this.listPrice = data;
      });
  }

}
