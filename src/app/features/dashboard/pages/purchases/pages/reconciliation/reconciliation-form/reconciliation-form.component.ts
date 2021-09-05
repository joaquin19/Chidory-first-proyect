import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { ToastrService } from 'ngx-toastr';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { PurchaseOrderHeaderService, ReconciliationHeaderService } from '../../../services';

@Component({
  selector: 'app-reconciliation-form',
  templateUrl: './reconciliation-form.component.html',
  styleUrls: ['./reconciliation-form.component.scss']
})
export class ReconciliationFormComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public headers: any;
  public listData: any;
  public loadingTable: boolean;
  public pageRedirect: string;
  public pageRedirectNew: string;
  public currentUser: any;
  public diferentSupplier: boolean;
  public listSelectedItems: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public purchaseOrderHeaderService: PurchaseOrderHeaderService,
    public reconciliationHeaderService: ReconciliationHeaderService
  ) {
    this.headers = [];
    this.listData = [];
    this.listSelectedItems = [];
    this.loadingTable = false;
    this.pageRedirect = '/dashboard/purchases/reconciliation';
    this.pageRedirectNew = '/dashboard/purchases/reconciliation/editReconciliation';
    this.diferentSupplier = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'folio', header: 'NO. OC', width: 'col-w md' },
      { field: 'statusName', header: 'Estatus', width: 'col-w lg' },
      { field: 'supplierName', header: 'Proveedor', width: 'col-w xxxl' },
      { field: 'createBy', header: 'Creado Por', width: 'col-w lg' },
      { field: 'createdOn', header: 'Fecha Creación', width: 'col-w lg' }
    ];
    this.getData();
  }

  getData(): void {
    this.purchaseOrderHeaderService.getPurchaseOrdersNoReconciliation(this.currentUser.userName).subscribe(
      data => {
        this.listData = data;
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
    this.tableList.exportExcel(`Lista de Conciliaciones`, true, headersExcel);
  }

  editItem() {
    this.router.navigate([`/dashboard/purchases/reconciliation/editReconciliation`]);
  }

  saveForm() {
    const reconciliationSave: any = {};
    reconciliationSave.reconciliationPurchaseOrderDetail = [];

    let SupplierId = 0;
    let CurrencyId = 0;
    if (this.listSelectedItems.length > 0) {
      SupplierId = this.listSelectedItems[0].supplierId;
      CurrencyId = this.listSelectedItems[0].currencyId;
    } else {
      this.toastr.warning('Favor de seleccionar al menos una orden de compra');
    }

    this.listSelectedItems.forEach(element => {
      if (SupplierId != element.supplierId) {
        this.toastr.warning('Las órdenes de compra deben ser del mismo proveedor para una conciliación');
        this.diferentSupplier = true;
      }

      if (CurrencyId != element.currencyId) {
        this.toastr.warning('Las órdenes de compra deben tener el mismo tipo de moneda para una conciliación');
        this.diferentSupplier = true;
      }
      reconciliationSave.reconciliationPurchaseOrderDetail.push({
        purchaseOrderHeaderId: element.id
      });
    });

    if (this.diferentSupplier === true) {
      this.diferentSupplier = false;
      return;
    }

    console.log(reconciliationSave);
    reconciliationSave.SupplierId = this.listSelectedItems[0].supplierId;
    reconciliationSave.CurrencyId = this.listSelectedItems[0].currencyId;
    reconciliationSave.SupplierPaymentTermId = this.listSelectedItems[0].paymentTermId;
    reconciliationSave.SupplierContactId = (this.listSelectedItems[0].supplierContactId > 0) ? this.listSelectedItems[0].supplierContactId : null;
    reconciliationSave.PhoneContact = this.listSelectedItems[0].supplierPhone;
    reconciliationSave.PaymentTypeId = this.listSelectedItems[0].paymentTypeId;
    reconciliationSave.ReceptionDate = this.listSelectedItems[0].estimatedDate;
    reconciliationSave.createBy = this.currentUser.userName;
    console.log(reconciliationSave);

    this.reconciliationHeaderService.saveReconciliation(reconciliationSave).subscribe(data => {
      this.toastr.success('Conciliación guardada correctamente.');
      console.log(data);
      this.pageRedirectNew = this.pageRedirectNew + `/${data.id}`;
      console.log(this.pageRedirectNew);
      this.router.navigate([this.pageRedirectNew]);
    }, error => {
      this.toastr.error(error.message);
    });
  }

  selectedItems(event): void {
    this.listSelectedItems = event;
  };

}
