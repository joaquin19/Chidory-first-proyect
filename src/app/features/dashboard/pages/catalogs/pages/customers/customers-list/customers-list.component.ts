import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { TableListComponent } from '@app/shared/components/table-list/table-list.component';
import { CustomerService } from '../../../services';
import { CustomersFormDetailComponent } from '../customers-form-detail/customers-form-detail.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public ref: DynamicDialogRef;
  public listCustomers: any;
  public headers: any;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    public dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.headers = [];
    this.listCustomers = [];
  }

  ngOnInit(): void {
    this.headers = [
      { field: 'id', header: 'No. Cliente', width: 'col-w lg' },
      { field: 'name', header: 'Cliente', width: 'col-w xxxxxxl' },
      { field: 'customerTypeName', header: 'Tipo Cliente', width: 'col-w lg' },
      { field: 'rfcId', header: 'RFC', width: 'col-w md' }
    ];

    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
      });
  }

  refreshData(): void {
    this.getCustomers();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Catálogo de Clientes`, true, headersExcel);
  }

  newItem(): void {
    this.router.navigate(['/dashboard/catalogs/customers/addCustomer']);
  }

  detailItem(event): void {
    this.ref = this.dialogService.open(CustomersFormDetailComponent, {
      data: event,
      header: `Detalle de Cliente`,
      width: '95%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });
  }

  editItem(event): void {
    this.router.navigate(['/dashboard/catalogs/customers/editCustomer', event.id]);
  }

}
