import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import {
  CustomerContactService, CustomerFinancialService, CustomerLegalRepresentativeService, CustomerRecordService
} from '../../../services';

@Component({
  selector: 'app-customers-form-detail',
  templateUrl: './customers-form-detail.component.html',
  styleUrls: ['./customers-form-detail.component.scss']
})
export class CustomersFormDetailComponent implements OnInit {

  public customer: any;
  public customerLegalRepresentative: any;
  public listCustomerFinancials: any;
  public headersCustomerFinancials: any;
  public customerRecord: any;
  public listCustomerContacts: any;
  public headersCustomerContacts: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private customerLegalRepresentativeService: CustomerLegalRepresentativeService,
    private customerFinancialService: CustomerFinancialService,
    private customerRecordService: CustomerRecordService,
    private customerContactService: CustomerContactService,
    private toastr: ToastrService
  ) {
    this.customer = {};
    this.customerLegalRepresentative = {};
    this.listCustomerFinancials = [];
    this.customerRecord = {};
    this.listCustomerContacts = [];
  }

  ngOnInit(): void {
    this.headersCustomerFinancials = [
      { field: 'account', header: 'No. Cuenta', width: 'col-w lg' },
      { field: 'clabe', header: 'Clabe', width: 'col-w lg' },
      { field: 'bankName', header: 'Banco', width: 'col-w lg' },
      { field: 'currencyName', header: 'Moneda', width: 'col-w lg' },
      { field: 'swift', header: 'Swift', width: 'col-w lg' },
      { field: 'contactName', header: 'Contacto', width: 'col-w xl' },
      { field: 'email', header: 'Email', width: 'col-w xl' },
      { field: 'phone', header: 'Teléfono', width: 'col-w md' }
    ];

    this.headersCustomerContacts = [
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
    this.customer = this.config.data;

    this.getCustomerLegalRepresentativeByCustomerId(this.customer.id);
    this.getCustomerFinancialsByCustomerId(this.customer.id);
    this.getCustomerRecordByCustomerId(this.customer.id);
    this.getCustomerContactsByCustomerId(this.customer.id);
  }

  getCustomerLegalRepresentativeByCustomerId(customerId) {
    this.customerLegalRepresentativeService.getCustomerLegalRepresentativeByCustomerId(customerId).subscribe(
      data => {
        this.customerLegalRepresentative = data != null ? data : this.customerLegalRepresentative;
        this.customerLegalRepresentative.firstName =
          this.customerLegalRepresentative.firstName != null ? this.customerLegalRepresentative.firstName : '';
        this.customerLegalRepresentative.lastName =
          this.customerLegalRepresentative.lastName != null ? this.customerLegalRepresentative.lastName : '';
        this.customerLegalRepresentative.curpId =
          this.customerLegalRepresentative.curpId != null ? this.customerLegalRepresentative.curpId : '';
        this.customerLegalRepresentative.rfcId =
          this.customerLegalRepresentative.rfcId != null ? this.customerLegalRepresentative.rfcId : '';
        this.customerLegalRepresentative.email =
          this.customerLegalRepresentative.email != null ? this.customerLegalRepresentative.email : '';
      });
  }

  getCustomerFinancialsByCustomerId(customerId) {
    this.customerFinancialService.getCustomerFinancialsByCustomerId(customerId).subscribe(
      data => {
        this.listCustomerFinancials = data;
      });
  }

  getCustomerRecordByCustomerId(customerId) {
    this.customerRecordService.getCustomerRecordByCustomerId(customerId).subscribe(
      data => {
        this.customerRecord = data;
        this.customerRecord.notes = this.customerRecord.notes !== null ? this.customerRecord.notes : '';
      });
  }

  getCustomerContactsByCustomerId(customerValue) {
    this.customerContactService.getCustomerContactsByCustomerId(customerValue).subscribe(
      data => {
        this.listCustomerContacts = data;
      });
  }

}
