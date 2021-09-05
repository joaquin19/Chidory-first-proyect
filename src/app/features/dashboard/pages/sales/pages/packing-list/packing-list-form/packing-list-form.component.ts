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
import { PackingListDetailService, PackingListHeaderService } from '../../../services';
import { PackingListFormProductComponent } from '../packing-list-form-product/packing-list-form-product.component';

@Component({
  selector: 'app-packing-list-form',
  templateUrl: './packing-list-form.component.html',
  styleUrls: ['./packing-list-form.component.scss']
})
export class PackingListFormComponent implements OnInit {

  @ViewChild('formPackingList', { static: false })
  public formPackingList: NgForm;

  public ref: DynamicDialogRef;
  public pageRedirect: string;
  public submitted: boolean;
  public packingList: any;
  public listProducts: any;
  public headersProducts: any;
  public countItemPallets: number;
  public company: any;
  public listCustomers: any;
  public action: Action;
  public actionForm: Action;
  public actionModal: any;
  public currentUser: any;
  public isEditable: boolean;
  public totalQuantity: number;
  public totalBoxQuantity: number;
  public totalGrossWeight: number;
  public totalMeasurement: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private companyService: CompanyService,
    private packingListHeaderService: PackingListHeaderService,
    private packingListDetailService: PackingListDetailService,
    public dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.pageRedirect = '/dashboard/sales/packing-list';
    this.submitted = false;
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
    this.countItemPallets = 0;
    this.company = {};
    this.listCustomers = [];
    this.action = Action.None;
    this.actionForm = Action.None;
    this.actionModal = Action;
    this.isEditable = false;
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
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addPackingList':
            this.action = Action.Create;
            this.isEditable = false;
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
            this.packingList.companyId = Company.KRAEM;
            this.getCompanyById(this.packingList.companyId);
            this.getCustomers();
            break;
          case 'editPackingList':
            this.action = Action.Edit;
            this.isEditable = true;
            this.packingList.companyId = Company.KRAEM;
            this.getPackingListById(params.id);
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

  getPackingListById(packingListId): void {
    this.packingListHeaderService.getPackingListById(packingListId).subscribe(
      data => {
        this.packingList = data;
        if (this.action === Action.Edit) {

          if (this.packingList.issueDate != null) {
            this.packingList.issueDate = moment(this.packingList.issueDate, 'DD-MM-YYYY').toDate();
          }

          if (this.packingList.departureDate != null) {
            this.packingList.departureDate = moment(this.packingList.departureDate, 'DD-MM-YYYY').toDate();
          }

          this.getCompanyById(this.packingList.companyId);
          this.getCustomers();
          this.getPackingListDetailByHeaderId(this.packingList.id);
        }
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
        const orderProducts = [...this.listProducts];
        this.countItemPallets = orderProducts.sort((a, b) => parseInt(b.pallet) - parseInt(a.pallet))[0].pallet + 1;
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
        if (this.action === Action.Edit) {
          this.changeCustomer({ value: this.packingList.customerId });
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

      this.packingList.consignee = `${customer.legalName}\n`
        + `${customer.street}\n`
        + `${customer.neighborhoodName}, ${customer.cityName}, `
        + `${customer.stateProvinceName}, ${customer.countryName}, C.P. ${customer.zipCode}\n`
        + `TAX ID: ${customer.taxId}\nTEL: ${customer.phone}\nFAX: ${customer.fax}`;
    } else {
      this.packingList.consignee = null;
    }
  }

  openModal(action: Action, item: any, index: number): void {
    if (this.packingList.customerId) {

      let titleModal: string = '';

      switch (action) {
        case Action.Create:
          titleModal = 'Agregar';
          break;
        case Action.Edit:
          titleModal = 'Editar';
          break;
      }
      const dataItem = { ...item };
      this.ref = this.dialogService.open(PackingListFormProductComponent, {
        data: { action, item: dataItem, customerId: this.packingList.customerId, countItemPallets: this.countItemPallets },
        header: `${titleModal} Producto`,
        width: '65%',
        closeOnEscape: false,
        contentStyle: {
          [`max-height`]: '680px',
          [`overflow`]: 'auto'
        }
      });

      this.ref.onClose.subscribe((result) => {
        if (result !== undefined) {
          switch (action) {
            case Action.Create:
              this.countItemPallets = result.countItemPallets;
              this.listProducts.push(result.item);
              this.listProducts.push(result.itemPallet);
              this.toastr.success(`Producto agregado correctamente.`);
              break;
            case Action.Edit:
              this.countItemPallets = result.countItemPallets + 1;
              this.listProducts[index] = result.item;
              this.toastr.success(`Producto editado correctamente.`);
              break;
          }

          this.calculateTotals();
        }
      });
    } else {
      this.toastr.warning('Favor de seleccionar un cliente.');
    }
  }

  deleteItem(item: any, index: number) {
    this.listProducts.splice(index, 2);
  }

  saveForm(): void {
    this.submitted = true;

    if (this.formPackingList.invalid) {
      return;
    }

    if (this.listProducts.length <= 0) {
      this.toastr.warning('Debe agregar al menos 1 producto al Packing List.');
      return;
    }

    const packingListSave: any = {};

    packingListSave.id = this.packingList.id;
    packingListSave.previousId = this.packingList.previousId;
    packingListSave.companyId = this.packingList.companyId;
    packingListSave.customerId = this.packingList.customerId;
    packingListSave.invoice = this.packingList.invoice;
    packingListSave.purchaseOrder = this.packingList.purchaseOrder;
    packingListSave.container = this.packingList.container;
    packingListSave.seal = this.packingList.seal;
    packingListSave.buyer = this.packingList.buyer;
    packingListSave.issueDate = this.packingList.issueDate !== null && this.packingList.issueDate !== undefined ?
      moment(this.packingList.issueDate).format('YYYY-MM-DD') : '';
    packingListSave.departureDate = this.packingList.departureDate !== null && this.packingList.departureDate !== undefined ?
      moment(this.packingList.departureDate).format('YYYY-MM-DD') : '';
    packingListSave.vesselFlight = this.packingList.vesselFlight;
    packingListSave.from = this.packingList.from;
    packingListSave.to = this.packingList.to;
    packingListSave.notify1 = this.packingList.notify1;
    packingListSave.notify2 = this.packingList.notify2;

    const detailArray = [];
    for (const item of this.listProducts) {
      detailArray.push({
        id: item.id,
        pallet: item.pallet,
        model: item.model,
        partNumber: item.partNumber,
        partDescription: item.partDescription,
        unitPrice: item.unitPrice,
        widthSize: item.widthSize,
        lengthSize: item.lengthSize,
        heightSize: item.heightSize,
        widthSizePacking: item.widthSizePacking,
        lengthSizePacking: item.lengthSizePacking,
        heightSizePacking: item.heightSizePacking,
        cmb: item.cmb,
        weight: item.weight,
        packingQuantity: item.packingQuantity,
        hsCode: item.hsCode,
        material: item.material,
        division: item.division,
        qaInspection: item.qaInspection,
        quantity: item.quantity,
        cmbPacking: item.cmbPacking,
        boxQuantity: item.boxQuantity,
        grossWeight: item.grossWeight,
        measurement: item.measurement
      });
    }
    packingListSave.detail = detailArray;
    packingListSave.createBy = this.currentUser.userName;

    console.log('packingListSave', packingListSave);

    switch (this.action) {
      case Action.Create:
        this.packingListHeaderService.savePackingList(packingListSave).subscribe(data => {
          this.toastr.success('Packing List guardado correctamente.');
          this.router.navigate([this.pageRedirect]);
        });
        break;
      case Action.Edit:
        this.packingListHeaderService.updatePackingList(packingListSave).subscribe(data => {
          this.toastr.success('Packing List editado correctamente.');
          this.router.navigate([this.pageRedirect]);
        });
        break;
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

}
