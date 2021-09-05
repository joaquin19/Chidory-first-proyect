import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import {
  SupplierContactService, SupplierFinancialService, SupplierLegalRepresentativeService, SupplierRecordService
} from '../../../services';

@Component({
  selector: 'app-suppliers-form-detail',
  templateUrl: './suppliers-form-detail.component.html',
  styleUrls: ['./suppliers-form-detail.component.scss']
})
export class SuppliersFormDetailComponent implements OnInit {

  public supplier: any;
  public supplierLegalRepresentative: any;
  public listSupplierFinancials: any;
  public headersSupplierFinancials: any;
  public supplierRecord: any;
  public listSupplierContacts: any;
  public headersSupplierContacts: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private supplierLegalRepresentativeService: SupplierLegalRepresentativeService,
    private supplierFinancialService: SupplierFinancialService,
    private supplierRecordService: SupplierRecordService,
    private supplierContactService: SupplierContactService,
    private toastr: ToastrService
  ) {
    this.supplier = {};
    this.supplierLegalRepresentative = {};
    this.listSupplierFinancials = [];
    this.supplierRecord = {};
    this.listSupplierContacts = [];
  }

  ngOnInit(): void {
    this.headersSupplierFinancials = [
      { field: 'account', header: 'No. Cuenta', width: 'col-w lg' },
      { field: 'clabe', header: 'Clabe', width: 'col-w lg' },
      { field: 'bankName', header: 'Banco', width: 'col-w lg' },
      { field: 'currencyName', header: 'Moneda', width: 'col-w lg' }
    ];

    this.headersSupplierContacts = [
      { field: 'fullName', header: 'Nombre', width: 'col-w xxl' },
      { field: 'phone1', header: 'Teléfono 1', width: 'col-w md' },
      { field: 'phone2', header: 'Teléfono 2', width: 'col-w md' },
      { field: 'movil1', header: 'Celular 1', width: 'col-w md' },
      { field: 'movil2', header: 'Celular 2', width: 'col-w md' },
      { field: 'email', header: 'Email', width: 'col-w xxl' }
    ];

    this.showForm();
  }

  showForm() {
    this.supplier = this.config.data;

    this.getSupplierLegalRepresentativeBySupplierId(this.supplier.id);
    this.getSupplierFinancialsBySupplierId(this.supplier.id);
    this.getSupplierRecordBySupplierId(this.supplier.id);
    this.getSupplierContactsBySupplierId(this.supplier.id);
  }

  getSupplierLegalRepresentativeBySupplierId(supplierId) {
    this.supplierLegalRepresentativeService.getSupplierLegalRepresentativeBySupplierId(supplierId).subscribe(
      data => {
        this.supplierLegalRepresentative = data != null ? data : this.supplierLegalRepresentative;
        this.supplierLegalRepresentative.firstName =
          this.supplierLegalRepresentative.firstName != null ? this.supplierLegalRepresentative.firstName : '';
        this.supplierLegalRepresentative.lastName =
          this.supplierLegalRepresentative.lastName != null ? this.supplierLegalRepresentative.lastName : '';
        this.supplierLegalRepresentative.curpId =
          this.supplierLegalRepresentative.curpId != null ? this.supplierLegalRepresentative.curpId : '';
        this.supplierLegalRepresentative.rfcId =
          this.supplierLegalRepresentative.rfcId != null ? this.supplierLegalRepresentative.rfcId : '';
        this.supplierLegalRepresentative.email =
          this.supplierLegalRepresentative.email != null ? this.supplierLegalRepresentative.email : '';
      });
  }

  getSupplierFinancialsBySupplierId(supplierId) {
    this.supplierFinancialService.getSupplierFinancialsBySupplierId(supplierId).subscribe(
      data => {
        this.listSupplierFinancials = data;
      });
  }

  getSupplierRecordBySupplierId(supplierId) {
    this.supplierRecordService.getSupplierRecordBySupplierId(supplierId).subscribe(
      data => {
        this.supplierRecord = data;
        this.supplierRecord.notes = this.supplierRecord.notes !== null ? this.supplierRecord.notes : '';
      });
  }

  getSupplierContactsBySupplierId(supplierValue) {
    this.supplierContactService.getSupplierContactsBySupplierId(supplierValue).subscribe(
      data => {
        this.listSupplierContacts = data;
      });
  }

}
