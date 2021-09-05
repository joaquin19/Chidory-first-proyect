import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { TableListComponent } from '@app/shared/components/table-list/table-list.component';
import { SupplierService } from '../../../services';
import { SuppliersFormDetailComponent } from '../suppliers-form-detail/suppliers-form-detail.component';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss']
})
export class SuppliersListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public ref: DynamicDialogRef;
  public listSuppliers: any;
  public headers: any;

  constructor(
    private router: Router,
    private supplierService: SupplierService,
    public dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.headers = [];
    this.listSuppliers = [];
  }

  ngOnInit(): void {
    this.headers = [
      { field: 'id', header: 'No. Proveedor', width: 'col-w lg' },
      { field: 'name', header: 'Proveedor', width: 'col-w xxxxxxl' },
      { field: 'SupplierTypeName', header: 'Tipo Proveedor', width: 'col-w lg' },
      { field: 'rfcId', header: 'RFC', width: 'col-w md' }
    ];

    this.getSuppliers();
  }

  getSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(
      data => {
        this.listSuppliers = data;
      });
  }

  refreshData(): void {
    this.getSuppliers();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Catálogo de Proveedores`, true, headersExcel);
  }

  newItem(): void {
    this.router.navigate(['/dashboard/catalogs/suppliers//addSupplier']);
  }

  detailItem(event): void {
    this.ref = this.dialogService.open(SuppliersFormDetailComponent, {
      data: event,
      header: `Detalle de Proveedor`,
      width: '95%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });
  }

  editItem(event): void {
    this.router.navigate(['/dashboard/catalogs/suppliers/editSupplier', event.id]);
  }

}
