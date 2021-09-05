import { Component, OnInit, Input } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-table-list-simple',
  templateUrl: './table-list-simple.component.html',
  styleUrls: ['./table-list-simple.component.scss']
})
export class TableListSimpleComponent implements OnInit {

  @Input() headers: any;
  @Input() data: any;
  @Input() rows: number;
  @Input() paginator: boolean;
  @Input() rowsPerPageOptions: Array<number>;

  constructor(
    private primengConfig: PrimeNGConfig
  ) {
    this.headers = [];
    this.data = [];
    this.rows = 10;
    this.paginator = false;
    this.rowsPerPageOptions = [5, 10, 25, 50];
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
  }

}
