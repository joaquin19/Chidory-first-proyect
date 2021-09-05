import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action, CustomerType } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { CurrencyService, CustomerService } from '../../../services';
import { ExportProductService } from '../../../services/export-product.service';

@Component({
  selector: 'app-product-export-form',
  templateUrl: './product-export-form.component.html',
  styleUrls: ['./product-export-form.component.scss']
})
export class ProductExportFormComponent implements OnInit {

  public productExport: any;
  public pageRedirect: string;
  public currentUser: any;
  public submitted: boolean;
  public listCustomers: any;
  public listCurrency: any;
  public isEdit: boolean;
  public listProductsExport: any;
  public action: Action;
  public listSatCodeProduct: any;
  public listSatCodeUnit: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private exportProductService: ExportProductService,
    private customerService: CustomerService,
    private currencyService: CurrencyService
  ) {
    this.submitted = false;
    this.listCustomers = [];
    this.listCurrency = [];
    this.listProductsExport = [];
    this.listSatCodeProduct = [];
    this.listSatCodeUnit = [];
    this.initObjects();
    this.isEdit = false;
    this.productExport = {
      createBy: '',
      id: 0,
      no: 0,
      customerId: null,
      customerName: '',
      currencyId: null,
      currency: '',
      claveProdServSATId: null,
      claveProdServSATCode: '',
      claveUnidadSATId: null,
      claveUnidadSATCode: '',
      model: 0.0,
      partNumber: 0.0,
      partDescription: 0.0,
      unitPrice: 0.0,
      widthSize: 0.0,
      lengthSize: 0.0,
      heightSize: 0.0,
      widthSizePacking: 0.0,
      lengthSizePacking: 0.0,
      heightSizePacking: 0.0,
      cmb: 0.0,
      weight: 0.0,
      packingQuantity: 0,
      hsCode: '',
      material: '',
      division: '',
      qaInspection: ''
    };
    this.pageRedirect = '/dashboard/catalogs/products-export';
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.showForm();
  }

  initObjects(): void {
    this.productExport = {
      createBy: '',
      id: 0,
      claveProdServSATId: null,
      claveProdServSATCode: '',
      claveUnidadSATId: null,
      claveUnidadSATCode: '',
      customerId: null,
      customerName: '',
      currencyId: null,
      currency: '',
      model: 0.0,
      partNumber: 0.0,
      partDescription: 0.0,
      unitPrice: 0.0,
      widthSize: 0.0,
      lengthSize: 0.0,
      heightSize: 0.0,
      widthSizePacking: 0.0,
      lengthSizePacking: 0.0,
      heightSizePacking: 0.0,
      cmb: 0.0,
      weight: 0.0,
      packingQuantity: 0,
      hsCode: '',
      material: '',
      division: '',
      qaInspection: ''
    };
  }

  showForm(): void {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addProductExport':
            this.initObjects();
            this.action = Action.Create;
            this.isEdit = false;
            break;
          case 'editProductExport':
            this.action = Action.Edit;
            this.isEdit = true;
            this.getProductExportById(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
    this.getCodeProductSAT();
    this.getCodeUnitSAT();
    this.getCustomers();
    this.getCurrencies();
  }

  importExcel(): void {
    this.router.navigate([this.pageRedirect]);
  }

  getProductExportById(exportProductId): void {
    this.exportProductService.getExportProductById(exportProductId).subscribe(
      data => {
        this.productExport = data;
      });
  }

  getCodeProductSAT(): void {
    this.exportProductService.getCodeProductServiceSAT().subscribe(
      data => {
        this.listSatCodeProduct = data;
      });
  }

  getCodeUnitSAT(): void {
    this.exportProductService.getCodeUnitSAT().subscribe(
      data => {
        this.listSatCodeUnit = data;
      });
  }

  getCustomers(): void {
    this.customerService.getCustomer().subscribe(
      data => {
        this.listCustomers = data.filter(o => o.customerTypeId === CustomerType.Exportacion);
      });
  }


  getCurrencies(): void {
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrency = data;
      });
  }

  saveForm(): void {
    this.submitted = true;

    const newPartNumber = this.productExport.partNumber;
    const newPartNumberCustomer = this.productExport.partNumberCustomer;
    const validNoExist = this.listProductsExport.find(item => item.no === Number(this.productExport.no));
    const validPartNo = this.listProductsExport.find(item => item.partNumber === this.productExport.partNumber);
    const validPartNoCust = this.listProductsExport.find(item => item.partNumberCustomer === this.productExport.partNumberCustomer);

    if ((validNoExist !== undefined && this.productExport.customerId === undefined)) {
      this.toastr.warning(`El No ${this.productExport.no} ya existe`);
      this.productExport.no = null;
      return;
    } else if (validPartNo !== undefined && this.productExport.customerId === undefined) {
      this.toastr.warning(`El No ${this.productExport.partNumber} de parte ya existe`);
      this.productExport.partNumber = null;
      return;
    }

    const productExportSave: any = {};

    productExportSave.createBy = this.currentUser.userName;
    productExportSave.id = this.productExport.id !== undefined ? this.productExport.id : 0;
    productExportSave.no = this.productExport.no;
    productExportSave.customerId = this.productExport.customerId;
    productExportSave.currencyId = this.productExport.currencyId;
    productExportSave.claveProdServSATId = this.productExport.claveProdServSATId;
    productExportSave.claveUnidadSATId = this.productExport.claveUnidadSATId;
    productExportSave.model = this.productExport.model;
    productExportSave.partNumber = this.productExport.partNumber;
    productExportSave.partDescription = this.productExport.partDescription;
    productExportSave.unitPrice = this.productExport.unitPrice;
    productExportSave.widthSize = this.productExport.widthSize;
    productExportSave.lengthSize = this.productExport.lengthSize;
    productExportSave.heightSize = this.productExport.heightSize;
    productExportSave.widthSizePacking = this.productExport.widthSizePacking;
    productExportSave.lengthSizePacking = this.productExport.lengthSizePacking;
    productExportSave.heightSizePacking = this.productExport.heightSizePacking;
    productExportSave.cmb = this.productExport.cmb;
    productExportSave.weight = this.productExport.weight;
    productExportSave.packingQuantity = this.productExport.packingQuantity;
    productExportSave.hsCode = this.productExport.hsCode;
    productExportSave.material = this.productExport.material;
    productExportSave.division = this.productExport.division;
    productExportSave.qaInspection = this.productExport.qaInspection;

    switch (this.action) {
      case Action.Create:
        this.exportProductService.saveExportProduct(productExportSave).subscribe(data => {
          this.toastr.success(`El Producto se guardó Correctamente`);
          this.router.navigate(['/dashboard/catalogs/products-export']);
        });
        break;
      case Action.Edit:
        this.exportProductService.updateExportProduct(productExportSave).subscribe(data => {
          this.toastr.success(`El Producto se editó correctamente`);
          this.router.navigate(['/dashboard/catalogs/products-export']);
        });
        break;
    }
  }

}
