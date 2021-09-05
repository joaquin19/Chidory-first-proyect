import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ProductsService } from '../../../services/products.service';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { GenericDataService } from '../../../../sales/services/generic-data.service';
import { DownloadFileService } from '@app/shared/services/download-file.service';
import { Template } from '@app/shared/enums';

@Component({
  selector: 'app-products-import',
  templateUrl: './products-import.component.html',
  styleUrls: ['./products-import.component.scss']
})
export class ProductsImportComponent implements OnInit {

  public headers: any;
  public listData: any;
  public loadingTable: boolean;
  public pageRedirect: string;
  public uploadedFiles: any;
  public listProductsImport: any;
  public fileNameProductImported: string;
  public typesFiles: string[];
  public currentUser: any;
  public listProducts: any;
  public files: any;
  public columns: any;
  public listProductTypes: any;
  public listUnitsMeasure: any;
  public listCustomers: any;
  public listProductLevel: any;
  public errorsCount: number;

  constructor(
    private router: Router,
    private genericDataService: GenericDataService,
    private toastr: ToastrService,
    private productService: ProductsService,
    public messageService: MessageService,
    public downloadFileService: DownloadFileService
  ) {
    this.errorsCount = 0;
    this.listProductTypes = [];
    this.listUnitsMeasure = [];
    this.listCustomers = [];
    this.listProductLevel = [];
    this.uploadedFiles = [];
    this.columns = [];
    this.files = [];
    this.headers = [];
    this.listData = [];
    this.listProducts = [];
    this.typesFiles = ['.xls', '.xlsx'];
    this.listProductsImport = [];
    this.fileNameProductImported = '';
    this.loadingTable = false;
    this.pageRedirect = '/dashboard/catalogs/products/addProduct';
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'no', header: 'NO', width: 'col-w lg' },
      { field: 'productType', header: 'TIPO', width: 'col-w xl' },
      { field: 'customer', header: 'CLIENTE', width: 'col-w xl' },
      { field: 'carModel', header: 'MODELO', width: 'col-w xl' },
      { field: 'carModelDr', header: 'MODELO DR', width: 'col-w xl' },
      { field: 'partNumber', header: 'NO. PARTE', width: 'col-w lg' },
      { field: 'partNumberCustomer', header: 'NO. PARTE CLIENTE', width: 'col-w lg' },
      { field: 'productLevelId', header: 'NIVEL PRODUCTO', width: 'col-w lg' },
      { field: 'component', header: 'COMPONENTE', width: 'col-w lg' },
      { field: 'partName', header: 'NOMBRE DE PARTE', width: 'col-w xl' },
      { field: 'grade', header: 'GRADO', width: 'col-w lg' },
      { field: 'msSpec', header: 'MS ESPECIFICO', width: 'col-w xl' },
      { field: 'supplier', header: 'PRROVEEDOR', width: 'col-w xl' },
      { field: 'use', header: 'USO', width: 'col-w lg' },
      { field: 'ctime', header: 'C/TIEMPO', width: 'col-w lg' },
      { field: 'cv', header: 'C/V', width: 'col-w lg' },
      { field: 'weight', header: 'PES', width: 'col-w lg' },
      { field: 'actualWeight', header: 'PESO ACTUAL', width: 'col-w lg' },
      { field: 'ttlKg', header: 'TTL KG', width: 'col-w lg' },
      { field: 'unitMeasure', header: 'UNIDAD DE MEDIDA', width: 'col-w lg' },
      { field: 'unitSale', header: 'UNIDAD DE VENTA', width: 'col-w lg' },
      { field: 'option', header: 'OPCION', width: 'col-w lg' },
      { field: 'remark', header: 'OBSERVACIONES', width: 'col-w xl' }
    ];
    this.getProductTypes();
    this.getUnitsMeasure();
    this.getProductLevel();
    this.getCustomers();
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

  documentSelect(event): void {
    if (event.currentFiles.length > 1) {
      this.toastr.error('error');
      return;
    }

    let fileExtension = '';

    for (const file of event.currentFiles) {
      fileExtension = (file.name.substr(file.name.lastIndexOf('.'))).toLowerCase();
      if (this.typesFiles.indexOf(fileExtension) === -1) {
        this.toastr.warning(`Solo se permiten archivos de tipo ${this.typesFiles}`);
        return;
      }
    }

    this.files = event.currentFiles[0];
    this.listProductsImport = [];

    const reader = new FileReader();

    reader.onload = (e) => {
      let data: any = e.target.result;
      data = new Uint8Array(data);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 'A' });
      if (sheet.length !== 0) {
        const listExcelImport = sheet;
        listExcelImport.splice(0, 2);
        this.listProductsImport = this.setProductsImport(listExcelImport);
      } else {
        this.toastr.warning('El Documento no contiene datos');
      }
    };
    reader.readAsArrayBuffer(this.files);
  }

  onRemove(event): void {
    this.listProductsImport = [];
    this.files = this.files.filter(o => o.name !== event.file.name);
  }

  setProductsImport(data): void {
    const productsImport: any = [];
    for (const item of data) {
      const productImport: any = {
        id: 0,
        no: null,
        productType: null,
        productTypeId: null,
        customer: null,
        carModel: null,
        carModelDr: '',
        partNumber: null,
        partNumberCustomer: '',
        productLevelId: null,
        component: '',
        partName: null,
        grade: '',
        msSpec: '',
        supplier: '',
        use: '',
        cTime: null,
        cv: null,
        weight: null,
        actualWeight: null,
        ttlKg: null,
        unitMeasure: '',
        unitSale: null,
        option: null,
        remark: ''
      };
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          switch (key) {
            case 'A':
              productImport.no = item[key];
              break;
            case 'B':
              productImport.productType = item[key];
              break;
            case 'C':
              productImport.customer = item[key];
              break;
            case 'D':
              productImport.carModel = item[key];
              break;
            case 'E':
              productImport.carModelDr = item[key];
              break;
            case 'F':
              productImport.partNumber = item[key];
              break;
            case 'G':
              productImport.partNumberCustomer = item[key];
              break;
            case 'H':
              productImport.productLevelId = 1;
              break;
            case 'I':
              productImport.productLevelId = 2;
              break;
            case 'J':
              productImport.productLevelId = 3;
              break;
            case 'K':
              productImport.productLevelId = 4;
              break;
            case 'L':
              productImport.productLevelId = 5;
              break;
            case 'M':
              productImport.component = item[key];
              break;
            case 'N':
              productImport.partName = item[key];
              break;
            case 'O':
              productImport.grade = item[key];
              break;
            case 'P':
              productImport.msSpec = item[key];
              break;
            case 'Q':
              productImport.supplier = item[key];
              break;
            case 'R':
              productImport.use = item[key];
              break;
            case 'S':
              productImport.ctime = item[key];
              break;
            case 'T':
              productImport.cv = item[key];
              break;
            case 'U':
              productImport.weight = item[key];
              break;
            case 'V':
              productImport.actualWeight = item[key];
              break;
            case 'W':
              productImport.ttlKg = item[key];
              break;
            case 'X':
              productImport.unitMeasure = item[key];
              break;
            case 'Y':
              productImport.unitSale = item[key];
              break;
            case 'Z':
              productImport.option = item[key];
              break;
            case 'AA':
              productImport.remark = item[key];
              break;
          }
        }
      }
      productsImport.push(productImport);
    }
    return productsImport;
  }

  addProduct(): void {
    this.router.navigate([this.pageRedirect]);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.listProducts = data;
      });
  }

  saveImportProducts(): void {

    if (this.listProductsImport.length === 0) {
      this.toastr.warning('Debe agregar al menos 1 registro a la lista de productos.');
      return;
    }

    if (this.errorsCount > 0) {
      this.toastr.warning('La lista de productos tiene errores favor de validar.');
      return;
    }

    const productSave: any = {};

    productSave.createBy = this.currentUser.userName;
    const newObject: any = [];

    for (const product of this.listProductsImport) {

      if (product.productType !== null) {
        if (!this.listProductTypes.some(o => o.name === product.productType.trim())) {
          this.toastr.warning(`Debe agregar un tipo de producto válido en el registro No. ${product.no}.`);
          return;
        } else {
          product.productTypeId = this.listProductTypes.filter(o => o.name === product.productType)[0].id;
        }
      }

      if (product.customer !== null) {
        if (!this.listCustomers.some(o => o.name === product.customer.trim())) {
          this.toastr.warning(`Debe agregar un cliente válido en el registro No. ${product.no}.`);
          return;
        } else {
          product.customerId = this.listCustomers.filter(o => o.name === product.customer)[0].id;
        }
      }

      if (product.unitMeasure !== '' && product.unitMeasure !== null) {
        if (!this.listUnitsMeasure.some(o => o.name === product.unitMeasure.trim())) {
          this.toastr.warning(`Debe agregar una unida de medida valida en el registro No. ${product.no}.`);
          return;
        } else {
          product.unitMeasureId = this.listUnitsMeasure.filter(o => o.name === product.unitMeasure)[0].id;
        }
      }

      newObject.push({
        id: product.id,
        no: product.no !== undefined ? product.no : null,
        productTypeId: product.productTypeId !== undefined ? product.productTypeId : null,
        customerId: product.customerId !== undefined ? product.customerId : null,
        carModel: product.carModel !== undefined ? product.carModel : null,
        carModelDr: product.carModelDr !== undefined ? product.carModelDr : null,
        partNumber: product.partNumber !== undefined ? product.partNumber : null,
        partNumberCustomer: product.partNumberCustomer !== undefined ? product.partNumberCustomer : null,
        productLevelId: product.productLevelId !== undefined ? product.productLevelId : null,
        component: product.component !== undefined ? product.component : null,
        partName: product.partName !== undefined ? product.partName : null,
        grade: product.grade !== undefined ? product.grade : null,
        msSpec: product.msSpec !== undefined ? product.msSpec : null,
        supplier: product.supplier !== undefined ? product.supplier : null,
        use: product.use !== undefined ? product.use : null,
        cTime: product.cTime !== undefined ? product.cTime : null,
        cv: product.cv !== undefined ? product.cv : null,
        weight: product.weight !== undefined ? product.weight : null,
        actualWeight: product.actualWeight !== undefined ? product.actualWeight : null,
        ttlKg: product.ttlKg !== undefined ? product.ttlKg : null,
        unitMeasureId: product.unitMeasureId !== undefined ? product.unitMeasureId : null,
        unitSale: product.unitSale !== undefined ? product.unitSale : null,
        option: product.option !== undefined ? product.option : null,
        remark: product.remark !== undefined ? product.remark : null
      });
    }

    productSave.detail = newObject;

    this.productService.saveProduct(productSave).subscribe(data => {
      this.router.navigate(['/dashboard/catalogs/products']);
      this.getProducts();
      this.toastr.success(`La lista de Productos se Guardaron Correctamente`);
    }, error => {
      this.toastr.error(`La lista de Productos no se guardaron`);
    });
  }

  downloadTemplate() {
    this.downloadFileService.getTemplate(Template.TemplateProduct).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `Plantilla_Productos.xlsx`);
      });
  }

}
