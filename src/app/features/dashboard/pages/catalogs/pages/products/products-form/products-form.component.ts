import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ProductsService } from '../../../services';
import { GenericDataService } from '../../../../sales/services/generic-data.service';
import { Action } from '../../../../../../../shared/enums/action';
import { ExportProductService } from '../../../services/export-product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {


  public product: any;
  public pageRedirect: string;
  public currentUser: any;
  public submitted: boolean;
  public listProductTypes: any;
  public listUnitsMeasure: any;
  public listCustomers: any;
  public listProductLevel: any;
  public listProducts: any;
  public action: Action;
  public listSatCodeProduct: any;
  public listSatCodeUnit: any;

  constructor(
    private productService: ProductsService,
    private genericDataService: GenericDataService,
    private confirmationService: ConfirmationService,
    private exportProductService: ExportProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.submitted = false;
    this.listProductTypes = [];
    this.listUnitsMeasure = [];
    this.listCustomers = [];
    this.listProductLevel = [];
    this.listProducts = [];
    this.listSatCodeProduct = [];
    this.listSatCodeUnit = [];
    this.initObjects();
    this.product = {
      createBy: '',
      detail: [
        {
          id: 0,
          no: 0,
          productTypeId: null,
          customerId: null,
          carModel: '',
          carModelDr: '',
          partNumber: '',
          partNumberCustomer: '',
          productLevelId: null,
          component: '',
          partName: '',
          grade: '',
          msSpec: '',
          supplier: '',
          use: '',
          cTime: 0,
          cv: 0,
          weight: 0,
          actualWeight: 0,
          ttlKg: null,
          unitMeasureId: null,
          unitSale: null,
          option: null,
          remark: ''
        }
      ]
    };
    this.pageRedirect = '/dashboard/catalogs/products/importProduct';
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.showForm();
  }

  initObjects(): void {
    this.product = {
      createBy: '',
      detail: [
        {
          id: 0,
          no: 0,
          productTypeId: null,
          customerId: null,
          carModel: '',
          carModelDr: '',
          partNumber: '',
          partNumberCustomer: '',
          productLevelId: null,
          component: '',
          partName: '',
          grade: '',
          msSpec: '',
          supplier: '',
          use: '',
          cTime: 0,
          cv: 0,
          weight: 0,
          actualWeight: 0,
          ttlKg: 0,
          unitMeasureId: null,
          unitSale: 0,
          option: 0,
          remark: ''
        }
      ]
    };
  }

  showForm(): void {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addProduct':
            this.initObjects();
            this.action = Action.Create;
            break;
          case 'editProduct':
            this.action = Action.Edit;
            this.getProductById(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });

    this.getProductTypes();
    this.getUnitsMeasure();
    this.getProductLevel();
    this.getCustomers();
    this.getProducts();
    this.getCodeProductSAT();
    this.getCodeUnitSAT();
  }

  importExcel(): void {
    this.router.navigate([this.pageRedirect]);
  }

  getProductById(productId): void {
    this.productService.getProductById(productId).subscribe(
      data => {
        this.product = data;
      });
  }

  getCustomers(): void {
    this.genericDataService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
        // this.customerObj.value = this.action === Action.Edit ? this.product.customerId : null;
      });
  }

  getProductLevel(): void {
    this.productService.getProductLevels().subscribe(
      data => {
        this.listProductLevel = data;
        // this.productLevelObj.value = this.action === Action.Edit ? this.product.productLevelId : null;
      });
  }

  getUnitsMeasure(): void {
    this.genericDataService.getUnitsMeasure().subscribe(
      data => {
        this.listUnitsMeasure = data;
        // this.unitsMeasureObj.value = (this.action === Action.Edit ? this.product.unitMeasureId : null);
      });
  }

  getProductTypes(): void {
    this.productService.getProductTypes().subscribe(
      data => {
        this.listProductTypes = data;
        // this.productTypeObj.value = this.action === Action.Edit ? this.product.productTypeId : null;
      });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.listProducts = data;
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

  saveForm(): void {
    this.submitted = true;

    const newPartNumber = this.product.partNumber;
    const newPartNumberCustomer = this.product.partNumberCustomer;
    const validNoExist = this.listProducts.find(item => item.no === Number(this.product.no));
    const validPartNo = this.listProducts.find(item => item.partNumber === this.product.partNumber);
    const validPartNoCust = this.listProducts.find(item => item.partNumberCustomer === this.product.partNumberCustomer);

    if ((validNoExist !== undefined && this.product.customerId === undefined)) {
      this.toastr.warning(`El No ${this.product.no} ya existe`);
      this.product.no = null;
      return;
    } else if (validPartNo !== undefined && this.product.customerId === undefined) {
      this.toastr.warning(`El No ${this.product.partNumber} de parte ya existe`);
      this.product.partNumber = null;
      return;
    } else if (validPartNoCust !== undefined && this.product.customerId === undefined) {
      this.toastr.warning(`El No ${this.product.partNumberCustomer} de parte de cliente ya existe`);
      this.product.partNumberCustomer = null;
      return;
    }

    const productSave: any = {};

    productSave.createBy = this.currentUser.userName;
    productSave.detail = [{
      id: this.product.id !== undefined ? this.product.id : 0,
      no: this.product.no,
      productTypeId: this.product.productTypeId,
      customerId: this.product.customerId,
      carModel: this.product.carModel,
      carModelDr: this.product.carModelDr,
      partNumber: this.product.partNumber,
      partNumberCustomer: this.product.partNumberCustomer,
      productLevelId: this.product.productLevelId,
      component: this.product.component,
      partName: this.product.partName,
      grade: this.product.grade,
      msSpec: this.product.msSpec,
      supplier: this.product.supplier,
      use: this.product.use,
      cTime: this.product.cTime,
      cv: this.product.cv,
      weight: this.product.weight,
      actualWeight: this.product.actualWeight,
      ttlKg: this.product.ttlKg,
      unitMeasureId: this.product.unitMeasureId,
      unitSale: this.product.unitSale,
      option: this.product.option,
      remark: this.product.remark,
      claveProdServSATId: this.product.claveProdServSATId,
      claveUnidadSATId: this.product.claveUnidadSATId
    }];

    switch (this.action) {
      case Action.Create:
        this.productService.saveProduct(productSave).subscribe(data => {
          this.router.navigate(['/dashboard/catalogs/products']);
          this.getProducts();
          this.toastr.success(`El Producto se guardó Correctamente`);
        }, error => {
          this.toastr.error(`El Producto no se guardó`);
        });
        break;
      case Action.Edit:
        this.productService.updateProduct(productSave).subscribe(data => {
          this.router.navigate(['/dashboard/catalogs/products']);
          this.getProducts();
          this.toastr.success(`El Producto se editó correctamente`);
        }, error => {
          this.toastr.error(`El Producto no se editó`);
        });
        break;
    }
  }


}
