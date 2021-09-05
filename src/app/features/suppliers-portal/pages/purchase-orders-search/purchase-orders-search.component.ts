import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import * as moment from 'moment';

import { SuppliersPortalService } from '../../services/suppliers-portal.service';

@Component({
  selector: 'app-purchase-orders-search',
  templateUrl: './purchase-orders-search.component.html',
  styleUrls: ['./purchase-orders-search.component.scss']
})
export class PurchaseOrdersSearchComponent implements OnInit {

  @ViewChild('formSupplier', { static: false })
  public formSupplier: NgForm

  public supplier: any;
  public purchaseOrder: any;
  public listSuppliers: any;
  public listPurchaseOrders: any;
  public headers: any;
  public selected: any;
  public submitted: boolean;
  public submittedSearch: boolean;
  public pageRedirect: string;
  public validAmounts: boolean;
  public files: any;
  public fileXML: number;
  public filePDF: number;

  constructor(
    public suppliersPortalService: SuppliersPortalService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService
  ) {
    this.supplier = {
      supplierId: null,
      subTotal: null,
      iva: null,
      total: null,
    };
    this.purchaseOrder = null;
    this.listSuppliers = [];
    this.listPurchaseOrders = [];
    this.submitted = false;
    this.submittedSearch = false;
    this.pageRedirect = '/';
    this.validAmounts = false;
    this.files = [];
    this.fileXML = 1;
    this.filePDF = 2;
  }

  ngOnInit(): void {

    this.headers = [
      { field: 'folio', header: 'No. Orden Compra', width: 'col-w xl' },
      { field: 'currencyCode', header: 'Moneda', width: 'col-w md' }
    ];

  }

  searchPurchaseOrder() {
    this.submittedSearch = true;

    if (this.supplier.supplierId === null) {
      return;
    }

    if (this.purchaseOrder === null || this.purchaseOrder.trim() === '') {
      return;
    }

    this.submittedSearch = false;
    this.getPurchaseOrderById(this.supplier.supplierId, this.purchaseOrder)
  }

  getPurchaseOrderById(supplierId, purchaseOrderId): void {

    if (this.listPurchaseOrders.some(o => o.id === parseInt(purchaseOrderId, 0))) {
      this.toastr.error(`La orden compra: <strong>${purchaseOrderId}</strong> ya esta agregada.`);
      return;
    }

    this.suppliersPortalService.getPurchaseOrderById(supplierId, purchaseOrderId).subscribe(
      data => {
        if (data !== null) {
          this.formSupplier.control.get(`supplierNo`).disable();
          this.formSupplier.control.get(`purchaseOrderNo`).reset();
          this.listPurchaseOrders.push(data);
        } else {
          this.toastr.error(`La orden compra: <strong>${purchaseOrderId}</strong> no existe.`);
        }
      });
  }

  deleteItem(rowData): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la orden de compra <strong>${rowData.folio}</strong>?`,
      header: 'Borrar Orden de Compra',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sí',
      acceptIcon: 'pi pi-check',
      acceptButtonStyleClass: 'p-button-rounded p-button-success',
      rejectLabel: 'No',
      rejectIcon: 'pi pi-times',
      rejectButtonStyleClass: 'p-button-rounded p-button-danger',
      closeOnEscape: false,
      accept: () => {
        this.listPurchaseOrders = this.listPurchaseOrders.filter(o => o.id !== rowData.id);

        if (this.listPurchaseOrders.length === 0) {
          this.formSupplier.control.get(`supplierNo`).enable();
          this.formSupplier.control.get(`purchaseOrderNo`).reset();
          this.formSupplier.control.get(`subTotal`)?.reset();
          this.formSupplier.control.get(`iva`)?.reset();
          this.formSupplier.control.get(`total`)?.reset();
          this.supplier.subTotal = null;
          this.supplier.iva = null;
          this.supplier.total = null;
        }
      }
    });
  }

  validPurchaseOrders(): void {
    this.submitted = true;

    if (this.formSupplier.control.get(`supplierNo`).invalid) {
      return;
    }

    if (this.formSupplier.control.get(`subTotal`).invalid) {
      return;
    }

    if (this.formSupplier.control.get(`iva`).invalid) {
      return;
    }

    if (this.formSupplier.control.get(`total`).invalid) {
      return;
    }

    if (this.listPurchaseOrders.length === 0) {
      return;
    }

    const purchaseOrderAmountSave: any = {};

    purchaseOrderAmountSave.subTotal = this.supplier.subTotal;
    purchaseOrderAmountSave.iva = this.supplier.iva;
    purchaseOrderAmountSave.total = this.supplier.total;

    const detailArray = [];
    this.listPurchaseOrders.forEach(element => {
      detailArray.push({
        id: element.id
      });
    });

    purchaseOrderAmountSave.detail = detailArray;

    this.suppliersPortalService.getPurchaseOrdersAmounts(purchaseOrderAmountSave).subscribe(
      data => {
        if (data.result) {
          this.validAmounts = true;
          this.formSupplier.control.get(`supplierNo`).disable();
          this.formSupplier.control.get(`purchaseOrderNo`).disable();
          this.formSupplier.control.get(`subTotal`).disable();
          this.formSupplier.control.get(`iva`).disable();
          this.formSupplier.control.get(`total`).disable();
        }
      });
  }

  clearProcess(): void {
    this.submitted = false;
    this.submittedSearch = false;
    this.supplier.supplierId = null;
    this.supplier.subTotal = null;
    this.supplier.iva = null;
    this.supplier.total = null;
    this.purchaseOrder = null;
    this.listPurchaseOrders = [];
    this.validAmounts = false;
    this.formSupplier.control.get(`supplierNo`).enable();
    this.formSupplier.control.get(`purchaseOrderNo`).enable();
    this.formSupplier.control.get(`subTotal`)?.enable();
    this.formSupplier.control.get(`iva`)?.enable();
    this.formSupplier.control.get(`total`)?.enable();
    this.files = [];
    this.formSupplier.reset();
  }

  calculateTotal(): void {
    const subTotal = this.supplier.subTotal ? this.supplier.subTotal : 0;
    const iva = this.supplier.iva ? this.supplier.iva : 0;
    this.supplier.total = (subTotal + iva);
  }

  fileSelect(typeFile, event) {
    const file = event.currentFiles[0];
    this.files = this.files.filter(o => o.typeFile !== typeFile);
    const fileItem = { typeFile, file }
    this.files.push(fileItem);
  }

  fileRemove(typeFile, event) {
    this.files = this.files.filter(o => o.name !== event.file.name && o.typeFile !== typeFile);
  }

  sendInvoice(): void {
    if (this.files.length < 2) {
      this.toastr.error(`Se deben agregar los archivos <strong>XML</strong> y <strong>PDF</strong> de la factura.`);
      return;
    }

    const purchaseOrderAmountSave: any = {};

    purchaseOrderAmountSave.subTotal = this.supplier.subTotal;
    purchaseOrderAmountSave.iva = this.supplier.iva;
    purchaseOrderAmountSave.total = this.supplier.total;

    const detailArray = [];
    this.listPurchaseOrders.forEach(element => {
      detailArray.push({
        id: element.id
      });
    });

    purchaseOrderAmountSave.detail = detailArray;

    const reconciliationSave: any = {};

    reconciliationSave.supplierId = this.listPurchaseOrders[0].supplierId;
    reconciliationSave.currencyId = this.listPurchaseOrders[0].currencyId;
    reconciliationSave.supplierPaymentTermId = this.listPurchaseOrders[0].paymentTermId;
    reconciliationSave.supplierContactId = (this.listPurchaseOrders[0].supplierContactId > 0) ? this.listPurchaseOrders[0].supplierContactId : null;
    reconciliationSave.phoneContact = this.listPurchaseOrders[0].supplierPhone;
    reconciliationSave.paymentTypeId = this.listPurchaseOrders[0].paymentTypeId;
    reconciliationSave.receptionDate = this.listPurchaseOrders[0].estimatedDate
      ? moment(this.listPurchaseOrders[0].estimatedDate, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD') : '';
    reconciliationSave.createBy = this.listPurchaseOrders[0].supplierId;

    const reconciliationPurchaseOrderDetailArray: any = [];
    for (const item of this.listPurchaseOrders) {
      reconciliationPurchaseOrderDetailArray.push({
        purchaseOrderHeaderId: item.id
      });
    }
    reconciliationSave.reconciliationPurchaseOrderDetail = reconciliationPurchaseOrderDetailArray

    const documentsArray = [];
    for (const item of this.files) {
      documentsArray.push({
        id: 0,
        userName: item.file.name,
        systemName: '',
        path: ''
      });
    }
    reconciliationSave.document = documentsArray;

    const formData = new FormData();

    for (const item of this.files) {
      formData.append('files', item.file, item.file.name);
    }

    formData.append('reconciliationHeaderSave', JSON.stringify(reconciliationSave));
    formData.append('purchaseOrderAmountSave', JSON.stringify(purchaseOrderAmountSave));

    this.suppliersPortalService.sendInvoice(formData).subscribe(data => {
      this.clearProcess();
      this.toastr.success('Factura enviada correctamente.');
    });
  }

}
