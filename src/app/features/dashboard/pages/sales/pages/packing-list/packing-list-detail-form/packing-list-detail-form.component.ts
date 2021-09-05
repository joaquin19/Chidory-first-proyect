import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action, Company, CustomerType, FormatColumn } from '@app/shared/enums';
import { CustomerService } from '@app/features/dashboard/pages/catalogs/services';
import { CompanyService } from '@app/shared/services/company.service';
import { PackingListDetailService, PackingListHeaderService } from '../../../services';


@Component({
  selector: 'app-packing-list-detail-form',
  templateUrl: './packing-list-detail-form.component.html',
  styleUrls: ['./packing-list-detail-form.component.scss']
})
export class PackingListDetailFormComponent implements OnInit {

  public dataReceived: any;
  public packingList: any;
  public listProducts: any;
  public headersProducts: any;
  public company: any;
  public listCustomers: any;
  public currentUser: any;
  public totalQuantity: number;
  public totalBoxQuantity: number;
  public totalGrossWeight: number;
  public totalMeasurement: number;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private customerService: CustomerService,
    private companyService: CompanyService,
    private packingListHeaderService: PackingListHeaderService,
    private packingListDetailService: PackingListDetailService
  ) {
    this.dataReceived = {};
    this.packingList = {
      id: 0,
      folio: null,
      previousId: 0,
      companyId: null,
      companyName: null,
      companyLegalName: null,
      customerId: null,
      customerName: null,
      customerLegalName: null,
      invoice: null,
      purchaseOrder: null,
      container: null,
      seal: null,
      buyer: null,
      issueDate: null,
      departureDate: null,
      vesselFlight: null,
      from: null,
      to: null,
      notify1: null,
      notify2: null
    };
    this.listProducts = [];
    this.headersProducts = [];
    this.company = {};
    this.listCustomers = [];
    this.totalQuantity = 0;
    this.totalBoxQuantity = 0;
    this.totalGrossWeight = 0;
    this.totalMeasurement = 0;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headersProducts = [
      { width: 'col-w lg', field: 'partNumber', header: 'Part Number' },
      { width: 'col-w xl', field: 'partDescription', header: 'Part Description' },
      { width: 'col-w md', field: 'sizeFullName', header: 'Size (H*W*L)' },
      { width: 'col-w md', field: 'material', header: 'Material' },
      { width: 'col-w sm', field: 'division', header: 'Division' },
      { width: 'col-w md', field: 'qaInspection', header: 'QA Inspection' },
      { width: 'col-w md', field: 'quantity', header: 'Quantity', format: FormatColumn.Quantity },
      { width: 'col-w lg', field: 'packingSizeFullName', header: 'Pack Size (H*W*L)' },
      { width: 'col-w md', field: 'cmbPacking', header: 'CBM (Per Pack)', format: FormatColumn.Decimal },
      { width: 'col-w md', field: 'boxQuantity', header: 'Box Quantity', format: FormatColumn.Quantity },
      { width: 'col-w lg', field: 'grossWeight', header: 'Gross Weight (kg)', format: FormatColumn.Decimal },
      { width: 'col-w md', field: 'measurement', header: 'Measurement', format: FormatColumn.Decimal }
    ];

    this.showForm();
  }

  showForm(): void {
    this.dataReceived = this.config.data;

    this.packingList.companyId = Company.KRAEM;
    this.getPackingListById(this.dataReceived.id);
  }

  getPackingListById(packingListId): void {
    this.packingListHeaderService.getPackingListById(packingListId).subscribe(
      data => {
        this.packingList = data;
        if (this.packingList.issueDate != null) {
          this.packingList.issueDate = moment(this.packingList.issueDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        }

        if (this.packingList.departureDate != null) {
          this.packingList.departureDate = moment(this.packingList.departureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        }

        this.getCompanyById(this.packingList.companyId);
        this.getCustomers();
        this.getPackingListDetailByHeaderId(this.packingList.id);
      });
  }

  getPackingListDetailByHeaderId(packingListId): void {
    this.packingListDetailService.getPackingListDetailByHeaderId(packingListId).subscribe(
      data => {
        this.listProducts = data;
        this.listProducts.map(o => (
          o.fullName = `${o.partNumber} - ${o.partDescription}`,
          o.sizeFullName = `${o.widthSize}*${o.lengthSize}*${o.heightSize}`,
          o.packingSizeFullName = `${o.widthSizePacking}*${o.lengthSizePacking}*${o.heightSizePacking}`
        ));
        this.calculateTotals();
      });
  }

  getCompanyById(companyId): void {
    this.companyService.getCompanyById(companyId).subscribe(
      data => {
        this.company = data;
        this.packingList.seller = `${this.company.legalName}\n`
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
        this.changeCustomer({ value: this.packingList.customerId });
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

      this.packingList.consignee = `${customer.legalName}\n`
        + `${customer.street}\n`
        + `${customer.neighborhoodName}, ${customer.cityName}, `
        + `${customer.stateProvinceName}, ${customer.countryName}, C.P. ${customer.zipCode}\n`
        + `TAX ID: ${customer.taxId}\nTEL: ${customer.phone}\nFAX: ${customer.fax}`;
    } else {
      this.packingList.consignee = null;
    }
  }

  calculateTotals(): void {
    for (const item of this.listProducts) {
      this.totalQuantity += item.quantity;
      this.totalBoxQuantity += item.boxQuantity;
      this.totalGrossWeight += item.grossWeight;
      this.totalMeasurement += item.measurement;
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
