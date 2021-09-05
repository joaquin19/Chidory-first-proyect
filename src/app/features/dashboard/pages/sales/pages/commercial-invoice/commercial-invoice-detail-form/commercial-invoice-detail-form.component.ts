import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as moment from 'moment';

import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action, Company, CustomerType, FormatColumn } from '@app/shared/enums';
import { CustomerService } from '@app/features/dashboard/pages/catalogs/services';
import { CompanyService } from '@app/shared/services/company.service';
import { CommercialInvoiceDetailService, CommercialInvoiceHeaderService } from '../../../services';

@Component({
  selector: 'app-commercial-invoice-detail-form',
  templateUrl: './commercial-invoice-detail-form.component.html',
  styleUrls: ['./commercial-invoice-detail-form.component.scss']
})
export class CommercialInvoiceDetailFormComponent implements OnInit {

  public dataReceived: any;
  public commercialInvoice: any;
  public listPackingList: any;
  public headersPackingList: any;
  public company: any;
  public listCustomers: any;
  public currentUser: any;
  public totalQuantity: number;
  public totalAmount: number;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private customerService: CustomerService,
    private companyService: CompanyService,
    private commercialInvoiceHeaderService: CommercialInvoiceHeaderService,
    private commercialInvoiceDetailService: CommercialInvoiceDetailService,
  ) {
    this.dataReceived = {};
    this.commercialInvoice = {
      id: 0,
      folio: null,
      companyId: null,
      companyName: null,
      companyLegalName: null,
      customerId: null,
      customerName: null,
      customerLegalName: null,
      invoice: null,
      purchaseOrder: null,
      buyer: null,
      issueDate: null,
      departureDate: null,
      vesselFlight: null,
      from: null,
      to: null,
      notify1: null,
      notify2: null,
      termsDelivery: null
    };
    this.listPackingList = [];
    this.headersPackingList = [];
    this.company = {};
    this.listCustomers = [];
    this.totalQuantity = 0;
    this.totalAmount = 0;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headersPackingList = [
      { width: 'col-w lg', field: 'partNumber', header: 'Part Number' },
      { width: 'col-w xl', field: 'partDescription', header: 'Part Description' },
      { width: 'col-w md', field: 'hsCode', header: 'HTS Code' },
      { width: 'col-w sm', field: 'material', header: 'Material' },
      { width: 'col-w sm', field: 'division', header: 'Division' },
      { width: 'col-w md', field: 'quantity', header: 'Quantity', format: FormatColumn.Quantity },
      { width: 'col-w lg', field: 'unitPrice', header: 'Unit Price', format: FormatColumn.Currency },
      { width: 'col-w lg', field: 'amount', header: 'Amount', format: FormatColumn.Currency }
    ];

    this.showForm();
  }

  showForm(): void {
    this.dataReceived = this.config.data;

    this.commercialInvoice.companyId = Company.KRAEM;
    this.getCommercialInvoiceById(this.dataReceived.id);
  }

  getCommercialInvoiceById(commercialInvoiceId): void {
    this.commercialInvoiceHeaderService.getCommercialInvoiceById(commercialInvoiceId).subscribe(
      data => {
        this.commercialInvoice = data;
        if (this.commercialInvoice.issueDate != null) {
          this.commercialInvoice.issueDate = moment(this.commercialInvoice.issueDate, 'DD-MM-YYYY').toDate();
        }

        if (this.commercialInvoice.departureDate != null) {
          this.commercialInvoice.departureDate = moment(this.commercialInvoice.departureDate, 'DD-MM-YYYY').toDate();
        }

        this.getCompanyById(this.commercialInvoice.companyId);
        this.getCustomers();
        this.getCommercialInvoiceDetailByHeaderId(this.commercialInvoice.id);
      });
  }

  getCommercialInvoiceDetailByHeaderId(commercialInvoiceId): void {
    this.commercialInvoiceDetailService.getCommercialInvoiceDetailByHeaderId(commercialInvoiceId).subscribe(
      data => {
        this.listPackingList = data;
        this.calculateTotals();
      });
  }

  getCompanyById(companyId): void {
    this.companyService.getCompanyById(companyId).subscribe(
      data => {
        this.company = data;
        this.commercialInvoice.seller = `${this.company.legalName}\n`
          + `${this.company.street}\n`
          + `${this.company.neighborhoodName}, ${this.company.cityName}, `
          + `${this.company.stateProvinceName}, ${this.company.countryName}, C.P. ${this.company.zipCode}\n`
          + `TEL: ${this.company.phone}\nFAX: ${this.company.fax}`;
      });
  }

  getCustomers(): void {
    this.customerService.getCustomer().subscribe(
      data => {
        this.listCustomers = data.filter(o => o.customerTypeId === CustomerType.Exportacion);
        this.changeCustomer({ value: this.commercialInvoice.customerId });
      });
  }

  changeCustomer(event): void {
    if (event.value !== null && event.value !== undefined) {
      const customer = this.listCustomers.filter(o => o.id === event.value)[0];
      customer.street = customer.street !== null && customer.street !== undefined ? customer.street : '';
      customer.neighborhoodName = customer.neighborhoodName !== null && customer.neighborhoodName !== undefined ? customer.neighborhoodName : '';
      customer.cityName = customer.cityName !== null && customer.cityName !== undefined ? customer.cityName : '';
      customer.stateProvinceName = customer.stateProvinceName !== null && customer.stateProvinceName !== undefined ? customer.stateProvinceName : '';
      customer.countryName = customer.countryName !== null && customer.countryName !== undefined ? customer.countryName : '';
      customer.zipCode = customer.zipCode !== null && customer.zipCode !== undefined ? customer.zipCode : '';
      customer.phone = customer.phone !== null && customer.phone !== undefined ? customer.phone : '';
      customer.taxId = customer.taxId !== null && customer.taxId !== undefined ? customer.taxId : '';
      customer.fax = customer.fax !== null && customer.fax !== undefined ? customer.fax : '';

      this.commercialInvoice.consignee = `${customer.legalName}\n`
        + `${customer.street}\n`
        + `${customer.neighborhoodName}, ${customer.cityName}, `
        + `${customer.stateProvinceName}, ${customer.countryName}, C.P. ${customer.zipCode}\n`
        + `TAX ID: ${customer.taxId}\nTEL: ${customer.phone}\nFAX: ${customer.fax}`;
    } else {
      this.commercialInvoice.consignee = null;
    }
  }

  calculateTotals(): void {
    for (const item of this.listPackingList) {
      this.totalQuantity += item.quantity;
      this.totalAmount += item.amount;
    }
  }

  downloadPDF() {
    // const dateCreateOn = (moment(`${this.packingList.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    // const packingListNamePDF = `PL${this.packingList.id}(${this.packingList.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    // const documentDefinition =
    //   this.packingListHeaderService.getDocumentDefinition(this.packingList, this.listProducts);
    // pdfMake.createPdf(documentDefinition).download(packingListNamePDF);
  }

  showPDF() {
    // const documentDefinition =
    //   this.packingListHeaderService.getDocumentDefinition(this.packingList, this.listProducts);
    // pdfMake.createPdf(documentDefinition).open();
  }

}
