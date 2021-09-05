import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action, Company, CustomerType, FormatColumn } from '@app/shared/enums';
import { CustomerService } from '@app/features/dashboard/pages/catalogs/services';
import { CompanyService } from '@app/shared/services/company.service';
import {
  CommercialInvoiceDetailService, CommercialInvoiceHeaderService, PackingListDetailService, PackingListHeaderService
} from '../../../services';

@Component({
  selector: 'app-commercial-invoice-form',
  templateUrl: './commercial-invoice-form.component.html',
  styleUrls: ['./commercial-invoice-form.component.scss']
})
export class CommercialInvoiceFormComponent implements OnInit {

  @ViewChild('formCommercialInvoice', { static: false })
  public formCommercialInvoice: NgForm;

  public ref: DynamicDialogRef;
  public pageRedirect: string;
  public submitted: boolean;
  public commercialInvoice: any;
  public listPackingListAvailable: any;
  public listPackingListAggregates: any;
  public listPackingList: any;
  public headersPackingList: any;
  public company: any;
  public listCustomers: any;
  public action: Action;
  public actionForm: Action;
  public actionModal: any;
  public currentUser: any;
  public isEditable: boolean;
  public totalQuantity: number;
  public totalAmount: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private companyService: CompanyService,
    private commercialInvoiceHeaderService: CommercialInvoiceHeaderService,
    private commercialInvoiceDetailService: CommercialInvoiceDetailService,
    private packingListHeaderService: PackingListHeaderService,
    private packingListDetailService: PackingListDetailService,
    public dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.pageRedirect = '/dashboard/sales/commercial-invoice';
    this.submitted = false;
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
    this.listPackingListAvailable = [];
    this.listPackingListAggregates = [];
    this.headersPackingList = [];
    this.company = {};
    this.listCustomers = [];
    this.action = Action.None;
    this.actionForm = Action.None;
    this.actionModal = Action;
    this.isEditable = false;
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

    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addCommercialInvoice':
            this.action = Action.Create;
            this.isEditable = false;
            this.commercialInvoice = {
              id: 0,
              folio: null,
              companyId: 0,
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
            this.commercialInvoice.companyId = Company.KRAEM;
            this.getCompanyById(this.commercialInvoice.companyId);
            this.getCustomers();
            break;
          case 'editCommercialInvoice':
            this.action = Action.Edit;
            this.isEditable = true;
            this.commercialInvoice.companyId = Company.KRAEM;
            this.getCommercialInvoiceById(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
  }

  getCommercialInvoiceById(commercialInvoiceId): void {
    this.commercialInvoiceHeaderService.getCommercialInvoiceById(commercialInvoiceId).subscribe(
      data => {
        this.commercialInvoice = data;
        if (this.action === Action.Edit) {

          if (this.commercialInvoice.issueDate != null) {
            this.commercialInvoice.issueDate = moment(this.commercialInvoice.issueDate, 'DD-MM-YYYY').toDate();
          }

          if (this.commercialInvoice.departureDate != null) {
            this.commercialInvoice.departureDate = moment(this.commercialInvoice.departureDate, 'DD-MM-YYYY').toDate();
          }

          this.getCompanyById(this.commercialInvoice.companyId);
          this.getCustomers();
          this.getCommercialInvoiceDetailByHeaderId(this.commercialInvoice.id);
        }
      });
  }

  getCommercialInvoiceDetailByHeaderId(commercialInvoiceId): void {
    this.commercialInvoiceDetailService.getCommercialInvoiceDetailByHeaderId(commercialInvoiceId).subscribe(
      data => {
        this.listPackingList = data;

        const mapValue = this.listPackingList.map(o => o.packingListHeaderId);
        const distinctValue = [...new Set(mapValue)];

        for (const item of distinctValue) {
          this.getPackingListById(item);
        }

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
        if (this.action === Action.Edit) {
          this.changeCustomer({ value: this.commercialInvoice.customerId });
        }
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

      this.getPackingListsByCustomerId(customer.id);
    } else {
      this.commercialInvoice.consignee = null;
      this.listPackingListAvailable = [];
      this.listPackingListAggregates = [];
    }
  }

  getPackingListsByCustomerId(customerId): void {
    this.packingListHeaderService.getPackingListsByCustomerId(customerId).subscribe(
      data => {
        this.listPackingListAvailable = data;
        this.listPackingListAvailable.map(o => (
          o.name = o.folio,
          o.code = o.id
        ));
      });
  }

  getPackingListById(packingListId): void {
    this.packingListHeaderService.getPackingListById(packingListId).subscribe(
      data => {
        if (data) {
          const arrayAggregates: any = [];
          arrayAggregates.push({ ...data });
          this.listPackingListAggregates = arrayAggregates;
          this.listPackingListAggregates.map(o => (
            o.name = o.folio,
            o.code = o.id
          ));
        }
      });
  }

  actionTarget(args): void {
    for (const item of args.items) {
      this.listPackingListAvailable = this.listPackingListAvailable.filter(o => o.id !== item.id);
      this.getPackingListDetailByHeaderId(item.id);
    }
  }

  actionSource(args): void {
    for (const item of args.items) {
      this.listPackingListAggregates = this.listPackingListAggregates.filter(o => o.id !== item.id);
      this.listPackingList = this.listPackingList.filter(o => o.packingListHeaderId !== item.id);
    }
  }

  getPackingListDetailByHeaderId(packingListId): void {
    this.packingListDetailService.getPackingListDetailByHeaderId(packingListId).subscribe(
      data => {
        const packingListDetail = data.filter(o => o.partDescription !== 'PALLET');
        for (const item of packingListDetail) {
          this.listPackingList.push({
            id: 0,
            packingListHeaderId: item.packingListHeaderId,
            partNumber: item.partNumber,
            partDescription: item.partDescription,
            hsCode: item.hsCode,
            material: item.material,
            division: item.division,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            amount: item.quantity * item.unitPrice
          })
        }
        this.calculateTotals();
      });
  }

  saveForm(): void {
    this.submitted = true;

    if (this.formCommercialInvoice.invalid) {
      return;
    }

    if (this.listPackingList.length <= 0) {
      this.toastr.warning('Debe agregar al menos 1 Packing List al Commercial Invoice.');
      return;
    }

    const commercialInvoiceSave: any = {};

    commercialInvoiceSave.id = this.commercialInvoice.id;
    commercialInvoiceSave.companyId = this.commercialInvoice.companyId;
    commercialInvoiceSave.customerId = this.commercialInvoice.customerId;
    commercialInvoiceSave.invoice = this.commercialInvoice.invoice;
    commercialInvoiceSave.purchaseOrder = this.commercialInvoice.purchaseOrder;
    commercialInvoiceSave.container = this.commercialInvoice.container;
    commercialInvoiceSave.issueDate = this.commercialInvoice.issueDate !== null && this.commercialInvoice.issueDate !== undefined ?
      moment(this.commercialInvoice.issueDate).format('YYYY-MM-DD') : '';
    commercialInvoiceSave.departureDate = this.commercialInvoice.departureDate !== null && this.commercialInvoice.departureDate !== undefined ?
      moment(this.commercialInvoice.departureDate).format('YYYY-MM-DD') : '';
    commercialInvoiceSave.vesselFlight = this.commercialInvoice.vesselFlight;
    commercialInvoiceSave.from = this.commercialInvoice.from;
    commercialInvoiceSave.to = this.commercialInvoice.to;
    commercialInvoiceSave.notify1 = this.commercialInvoice.notify1;
    commercialInvoiceSave.notify2 = this.commercialInvoice.notify2;

    const detailArray = [];
    for (const item of this.listPackingList) {
      detailArray.push({
        id: item.id,
        packingListHeaderId: item.packingListHeaderId,
        partNumber: item.partNumber,
        partDescription: item.partDescription,
        hsCode: item.hsCode,
        material: item.material,
        division: item.division,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        amount: item.amount
      });
    }
    commercialInvoiceSave.detail = detailArray;
    commercialInvoiceSave.createBy = this.currentUser.userName;

    console.log('commercialInvoiceSave', commercialInvoiceSave);

    switch (this.action) {
      case Action.Create:
        this.commercialInvoiceHeaderService.saveCommercialInvoice(commercialInvoiceSave).subscribe(data => {
          this.toastr.success('Commercial Invoice guardado correctamente.');
          this.router.navigate([this.pageRedirect]);
        });
        break;
      case Action.Edit:
        this.commercialInvoiceHeaderService.updateCommercialInvoice(commercialInvoiceSave).subscribe(data => {
          this.toastr.success('Commercial Invoice editado correctamente.');
          this.router.navigate([this.pageRedirect]);
        });
        break;
    }
  }

  calculateTotals(): void {
    for (const item of this.listPackingList) {
      this.totalQuantity += item.quantity;
      this.totalAmount += item.amount;
    }
  }

}
