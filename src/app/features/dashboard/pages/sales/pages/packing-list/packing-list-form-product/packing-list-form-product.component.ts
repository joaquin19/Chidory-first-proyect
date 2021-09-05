import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { Action } from '../../../../../../../shared/enums/action';
import { ExportProductService } from '@app/features/dashboard/pages/catalogs/services';

@Component({
  selector: 'app-packing-list-form-product',
  templateUrl: './packing-list-form-product.component.html',
  styleUrls: ['./packing-list-form-product.component.scss']
})
export class PackingListFormProductComponent implements OnInit {

  @ViewChild('formProducts', { static: false })
  public formProducts: NgForm;

  public customerId: any;
  public action: Action;
  public item: any;
  public itemPallet: any;
  public dataReceived: any;
  public countItemPallets: number;
  public listProducts: any;
  public submitted: boolean;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private exportProductService: ExportProductService,
    private toastr: ToastrService
  ) {
    this.dataReceived = {};
    this.item = {
      id: 0,
      packingListHeaderId: 0,
      pallet: 0,
      model: null,
      partNumber: null,
      partDescription: null,
      unitPrice: 0,
      widthSize: 0,
      lengthSize: 0,
      heightSize: 0,
      widthSizePacking: 0,
      lengthSizePacking: 0,
      heightSizePacking: 0,
      cmb: 0,
      weight: 0,
      packingQuantity: 0,
      hsCode: null,
      material: null,
      division: null,
      qaInspection: null,
      quantity: 0,
      cmbPacking: 0,
      boxQuantity: 0,
      grossWeight: 0,
      measurement: 0
    }
    this.itemPallet = {
      id: 0,
      packingListHeaderId: 0,
      pallet: 0,
      model: null,
      partNumber: null,
      partDescription: null,
      unitPrice: 0,
      widthSize: 0,
      lengthSize: 0,
      heightSize: 0,
      widthSizePacking: 0,
      lengthSizePacking: 0,
      heightSizePacking: 0,
      cmb: 0,
      weight: 0,
      packingQuantity: 0,
      hsCode: null,
      material: null,
      division: null,
      qaInspection: null,
      quantity: 0,
      cmbPacking: 0,
      boxQuantity: 0,
      grossWeight: 0,
      measurement: 0
    };
    this.countItemPallets = 0;
    this.listProducts = [];
    this.submitted = false;
  }

  ngOnInit(): void {
    this.showForm();
  }

  showForm(): void {
    this.dataReceived = this.config.data;
    this.action = this.dataReceived.action;
    this.item = this.dataReceived.item;
    this.customerId = this.dataReceived.customerId;
    this.countItemPallets = this.dataReceived.countItemPallets;

    switch (this.action) {
      case Action.Create:
        this.countItemPallets += 1;
        this.item = {
          id: 0,
          packingListHeaderId: 0,
          pallet: 0,
          model: null,
          partNumber: null,
          partDescription: null,
          unitPrice: 0,
          widthSize: 0,
          lengthSize: 0,
          heightSize: 0,
          widthSizePacking: 0,
          lengthSizePacking: 0,
          heightSizePacking: 0,
          cmb: 0,
          weight: 0,
          packingQuantity: 0,
          hsCode: null,
          material: null,
          division: null,
          qaInspection: null,
          quantity: 0,
          cmbPacking: 0,
          boxQuantity: 0,
          grossWeight: 0,
          measurement: 0
        };
        this.itemPallet = {
          id: 0,
          packingListHeaderId: 0,
          pallet: 0,
          model: null,
          partNumber: null,
          partDescription: null,
          unitPrice: 0,
          widthSize: 0,
          lengthSize: 0,
          heightSize: 0,
          size: null,
          widthSizePacking: 0,
          lengthSizePacking: 0,
          heightSizePacking: 0,
          cmb: 0,
          weight: 0,
          packingQuantity: 0,
          hsCode: null,
          material: null,
          division: null,
          qaInspection: null,
          quantity: 0,
          cmbPacking: 0,
          boxQuantity: 0,
          grossWeight: 0,
          measurement: 0
        };
        break;
      case Action.Edit:
        this.countItemPallets -= 1;
        this.item.size = `${this.item.widthSize}*${this.item.lengthSize}*${this.item.heightSize}`;
        this.item.packingSize = `${this.item.widthSizePacking}*${this.item.lengthSizePacking}*${this.item.heightSizePacking}`;
        break;
    }

    this.getExportProducts(this.customerId);
  }

  getExportProducts(customerId) {
    this.exportProductService.getExportProducts(customerId).subscribe(
      data => {
        this.listProducts = data;
        this.listProducts.map(o => (
          o.fullName = `${o.partNumber} - ${o.partDescription}`,
          o.sizeFullName = `${o.widthSize}*${o.lengthSize}*${o.heightSize}`,
          o.packingSizeFullName = `${o.widthSizePacking}*${o.lengthSizePacking}*${o.heightSizePacking}`
        ));

        const itemPallet = this.listProducts.filter(o => o.partNumber === 'PALLET')[0];
        this.itemPallet.model = itemPallet.model;
        this.itemPallet.partNumber = `${itemPallet.partNumber} NO.${this.countItemPallets}`;
        this.itemPallet.partDescription = itemPallet.partDescription;
        this.itemPallet.unitPrice = itemPallet.unitPrice;
        this.itemPallet.widthSize = itemPallet.widthSize;
        this.itemPallet.lengthSize = itemPallet.lengthSize;
        this.itemPallet.heightSize = itemPallet.heightSize;
        this.itemPallet.size = itemPallet.sizeFullName;
        this.itemPallet.widthSizePacking = itemPallet.widthSizePacking;
        this.itemPallet.lengthSizePacking = itemPallet.lengthSizePacking;
        this.itemPallet.heightSizePacking = itemPallet.heightSizePacking;
        this.itemPallet.packingSize = itemPallet.packingSizeFullName;
        this.itemPallet.cmb = itemPallet.cmb;
        this.itemPallet.weight = itemPallet.weight;
        this.itemPallet.packingQuantity = itemPallet.packingQuantity;
        this.itemPallet.hsCode = itemPallet.hsCode;
        this.itemPallet.material = itemPallet.material;
        this.itemPallet.division = itemPallet.division;
        this.itemPallet.qaInspection = itemPallet.qaInspection;

        this.listProducts = this.listProducts.filter(o => o.partNumber !== 'PALLET');
      });
  }

  changeProduct(event) {
    const partNumber = event.value;
    if (partNumber !== null) {
      const productItem = this.listProducts.filter(o => o.partNumber === partNumber)[0];
      this.item.model = productItem.model;
      this.item.partNumber = productItem.partNumber;
      this.item.partDescription = productItem.partDescription;
      this.item.unitPrice = productItem.unitPrice;
      this.item.widthSize = productItem.widthSize;
      this.item.lengthSize = productItem.lengthSize;
      this.item.heightSize = productItem.heightSize;
      this.item.size = productItem.sizeFullName;
      this.item.widthSizePacking = productItem.widthSizePacking;
      this.item.lengthSizePacking = productItem.lengthSizePacking;
      this.item.heightSizePacking = productItem.heightSizePacking;
      this.item.packingSize = productItem.packingSizeFullName;
      this.item.cmb = productItem.cmb;
      this.item.weight = productItem.weight;
      this.item.packingQuantity = productItem.packingQuantity;
      this.item.hsCode = productItem.hsCode;
      this.item.material = productItem.material;
      this.item.division = productItem.division;
      this.item.qaInspection = productItem.qaInspection;

      this.itemCalculation(this.item.quantity);
    }
  }

  inputQuantity(event) {
    const valueQuantity = parseInt(event.value, 0);

    if (!isNaN(valueQuantity)) {
      this.itemCalculation(valueQuantity);
    }
  }

  itemCalculation(quantity = 0) {
    this.item.pallet = this.countItemPallets;
    this.item.quantity = quantity;
    this.item.cmbPacking = (this.item.widthSizePacking * this.item.lengthSizePacking * this.item.heightSizePacking) / 1000000000;
    this.item.boxQuantity = this.item.quantity / this.item.packingQuantity;
    this.item.grossWeight = this.item.quantity * this.item.weight;
    this.item.measurement = this.item.cmbPacking * this.item.boxQuantity;

    if (this.action === Action.Create) {
      this.itemPallet.pallet = this.countItemPallets;
      this.itemPallet.quantity = 1;
      this.itemPallet.cmbPacking = (this.itemPallet.widthSizePacking * this.itemPallet.lengthSizePacking * this.itemPallet.heightSizePacking) / 1000000000;
      this.itemPallet.boxQuantity = this.itemPallet.quantity / this.itemPallet.packingQuantity;
      this.itemPallet.grossWeight = this.itemPallet.quantity * this.itemPallet.weight;
      this.itemPallet.measurement = this.itemPallet.cmbPacking * this.itemPallet.boxQuantity;
    }
  }

  saveForm() {
    this.submitted = true;

    if (this.formProducts.invalid) {
      return;
    }

    if (!Number.isInteger(this.item.quantity) || this.item.quantity <= 0) {
      this.toastr.warning('<strong>Quantity</strong> debe ser mayor a 0.');
      return;
    }

    if (!Number.isInteger(this.item.boxQuantity) || this.item.boxQuantity <= 0) {
      this.toastr.warning('<strong>Box Quantity</strong> no debe contener decimales y/o debe ser mayor a 0.');
      return;
    }

    this.closeForm({ item: this.item, itemPallet: this.itemPallet, countItemPallets: this.countItemPallets });
  }

  closeForm(resp): void {
    this.ref.close(resp);
  }

}
