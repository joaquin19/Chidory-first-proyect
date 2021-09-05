import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { GenericDataService } from '../../../services/generic-data.service';
import { PriceHeaderService } from '../../../services/price-header.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { OrderType } from '../../../../../../../shared/enums/order-type';
import { ProductsService } from '../../../../catalogs/services/products.service';
import { TaxService } from '../../../../catalogs/services/tax.service';
import { ProjectsService } from '../../../services/projects.service';
import { Action } from '../../../../../../../shared/enums/action';
import { Template } from '@app/shared/enums';
import { DownloadFileService } from '@app/shared/services/download-file.service';

@Component({
  selector: 'app-price-list-form',
  templateUrl: './price-list-form.component.html',
  styleUrls: ['./price-list-form.component.scss']
})
export class PriceListFormComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colPricecform: any;
  public listPriceForm: any;
  public pageRedirect: string;
  public uploadedFiles: any;
  public listCustomers: any;
  public listCurrencies: any;
  public currentUser: any;
  public listPriceList: any;
  public priceList: any;
  public listPrice: any;
  public action: Action;
  public submitted: boolean;
  public files: any;
  public typesFiles: string[];
  public projectObj: any;
  public customerObj: any;
  public errorsCount: number;
  public orderTypeCustomer: OrderType;
  public orderTypeProject: OrderType;
  public listPriceTable: any;
  public listTaxes: any;
  public listProducts: any;
  public listProjects: any;
  public listCustomersProject: any;

  constructor(
    private genericDataService: GenericDataService,
    private productService: ProductsService,
    private projectService: ProjectsService,
    private taxesService: TaxService,
    private priceHeaderService: PriceHeaderService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    public messageService: MessageService,
    public downloadFileService: DownloadFileService
  ) {
    this.orderTypeCustomer = OrderType.Customer;
    this.orderTypeProject = OrderType.Project;
    this.files = [];
    this.listPriceList = [];
    this.colPricecform = [];
    this.uploadedFiles = [];
    this.priceList = {};
    this.listPrice = [];
    this.listProjects = [];
    this.listCustomersProject = [];
    this.listCurrencies = [];
    this.listTaxes = [];
    this.listProducts = [];
    this.typesFiles = ['.xls', '.xlsx'];
    this.priceList = {};
    this.submitted = false;
    this.listPriceForm = {
      id: 0,
      priceTypeId: 1,
      customerId: null,
      projectId: null,
      currencyId: null,
      name: '',
      startDate: '',
      endDate: '',
      notes: '',
      createBy: '',
      createdOn: ''
    };
    this.listPriceTable = [];
    this.errorsCount = 0;
    this.listCustomers = [];
    this.pageRedirect = '/dashboard/sales/price-list';
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.showForm();
    this.colPricecform = [
      { field: 'no', header: 'NO', width: 'col-w lg' },
      { field: 'saleType', header: 'TIPO', width: 'col-w lg' },
      { field: 'carModel', header: 'MODELO', width: 'col-w lg' },
      { field: 'carModelDr', header: 'MODELO DR', width: 'col-w lg' },
      { field: 'partNumber', header: 'NO. PARTE', width: 'col-w lg' },
      { field: 'partNumberCustomer', header: 'NO. PARTE CLIENTE', width: 'col-w xl' },
      { field: 'component', header: 'COMPONENTE', width: 'col-w xl' },
      { field: 'partName', header: 'NOMBRE DE PARTE', width: 'col-w xl' },
      { field: 'material', header: 'MATERIAL', width: 'col-w lg' },
      { field: 'unit', header: 'UNIDAD', width: 'col-w lg' },
      { field: 'us', header: 'U/S', width: 'col-w lg' },
      { field: 'option', header: 'OPCION', width: 'col-w lg' },
      { field: 'taxName', header: 'IMPUESTO', width: 'col-w lg' }
    ];
  }

  clearFile(): void {
    this.listPrice = [];
    this.listPriceTable = [];
    this.errorsCount = 0;
    // this.collectionSize = 0;
    // this.fileNamePriceListImported = '';
    // this.fileUploadPriceListImported.nativeElement.value = '';
  }

  showForm(): void {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addPriceList':
            this.priceList = {
              id: 0,
              priceTypeId: 1,
              customerId: null,
              projectId: null,
              currencyId: null,
              name: '',
              startDate: moment().toDate(),
              endDate: moment().add(1, 'days').toDate(),
              notes: '',
              createBy: '',
              createdOn: ''
            };
            this.action = Action.Create;
            break;
          case 'editPriceList':
            this.priceList = {
              id: 0,
              priceTypeId: 1,
              customerId: null,
              projectId: null,
              currencyId: null,
              name: '',
              startDate: '',
              endDate: '',
              notes: '',
              createBy: '',
              createdOn: ''
            };
            this.getPriceById(params.id);
            this.action = Action.Edit;
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
    this.getCustomers();
    this.getProjects();
    this.getCurrencies();
    this.getTaxes();
    this.getProducts();
  }

  changeOrderType(): void {
    this.clearFile();
  }

  getPriceById(priceById): void {
    this.priceHeaderService.getPriceById(priceById).subscribe(
      data => {
        this.priceList = data;
        // const [dayEnd, monthEnd, yearEnd] = moment(this.priceList.endDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY').split('-');
        // const objStartDate = { day: parseInt(dayStart, 0), month: parseInt(monthStart, 0), year: parseInt(yearStart, 0) };
        // const objEndDate = { day: parseInt(dayEnd, 0), month: parseInt(monthEnd, 0), year: parseInt(yearEnd, 0) };
        this.getPriceDetailByHeaderId(priceById);
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  getPriceDetailByHeaderId(priceHeaderId): void {
    this.priceHeaderService.getPriceDetailByHeaderId(priceHeaderId).subscribe(
      data => {
        this.listPrice = data;
        // this.collectionSize = this.listPrice.length;
        // this.refreshItems();
      });
  }

  changePriceType(): void {
    this.clearFile();
    switch (this.priceList.priceTypeId) {
      case this.orderTypeCustomer:
        this.customerObj.value = null;
        break;
      case this.orderTypeProject:
        this.projectObj.value = null;
        break;
    }

  }

  dateSelectStart(): void {
    const startDate = moment(this.priceList.startDate).format('YYYY-MM-DD');
    const endDate = moment(this.priceList.endDate).format('YYYY-MM-DD');
    const toDay = moment().toDate().toString();

    if (startDate > endDate) {
      this.priceList.startDate = new Date();
      this.toastr.warning(`La Fecha de Inicio debe ser menor o igual a la Fecha de Fin.`);
    }
  }

  dateSelectEnd(): void {
    const startDate = moment(this.priceList.startDate).format('YYYY-MM-DD');
    const endDate = moment(this.priceList.endDate).format('YYYY-MM-DD');

    if (endDate < startDate) {
      this.priceList.endDate = new Date();
      this.toastr.warning(`La Fecha de Fin debe ser mayor o igual a la Fecha de Inicio.`);
    }
  }

  getCustomers(): void {
    this.genericDataService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
        // this.customerObj.value = this.action === Action.Edit ? this.priceList.customerId : null;
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  changeCustomer(): void {
    this.clearFile();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      data => {
        this.listProjects = data;
        if (this.action === Action.Edit) {
          if (this.priceList.projectId !== null) {
            this.projectObj.value = this.priceList.projectId;
          }
        }
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  changeProject(event): void {
    this.clearFile();
    this.listCustomersProject = [];
    const projectValue = event.value;
    if (projectValue !== null) {
      this.getProjectCustomers(projectValue);
    }
  }

  getProjectCustomers(projectId): void {
    this.genericDataService.getProjectCustomers(projectId).subscribe(
      data => {
        this.listCustomersProject = data;
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  getCurrencies(): void {
    this.genericDataService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  getTaxes(): void {
    this.taxesService.getTaxes().subscribe(
      data => {
        this.listTaxes = data;
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.listProducts = data;
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  saveForm(): void {
    this.submitted = true;
    if (this.listPrice.length === 0) {
      this.toastr.warning('Debe agregar al menos 1 registro a la lista de precios.');
      return;
    }

    if (this.errorsCount > 0) {
      this.toastr.warning('La lista de precios tiene errores favor de validar.');
      return;
    }

    for (const price of this.listPrice) {

      if (!isNaN(price.taxName)) {
        price.taxName = null;
      }

      if (price.taxName !== null) {
        if (!this.listTaxes.some(o => o.name === price.taxName)) {
          this.toastr.warning(`Debe agregar un impuesto válido en el registro No. ${price.no}.`);
          return;
        } else {
          price.taxId = this.listTaxes.filter(o => o.name === price.taxName.trim())[0].id;
        }
      }
    }

    const priceListSave: any = {};

    priceListSave.id = this.priceList.id;
    priceListSave.priceTypeId = this.priceList.priceTypeId;
    priceListSave.customerId = this.priceList.customerId;
    priceListSave.currencyId = this.priceList.currencyId;
    priceListSave.name = this.priceList.name;
    priceListSave.startDate = moment(this.priceList.startDate).format('YYYY-MM-DD');
    priceListSave.endDate = moment(this.priceList.endDate).format('YYYY-MM-DD');
    priceListSave.notes = this.priceList.notes;
    priceListSave.createBy = this.currentUser.userName;

    const detailArray = [];
    for (const price of this.listPrice) {
      detailArray.push({
        id: price.id,
        no: price.no,
        saleType: price.saleType,
        carModel: price.carModel,
        carModelDr: price.carModelDr,
        partNumber: price.partNumber,
        partNumberCustomer: price.partNumberCustomer,
        component: price.component,
        partName: price.partName,
        material: price.material,
        unit: price.unit,
        us: !isNaN(parseInt(price.stdPack, 0)) ? parseInt(price.stdPack, 0) : 0,
        option: !isNaN(parseFloat(price.stdPack)) ? parseFloat(price.stdPack) : 0,
        taxId: price.taxId,
        salePrice: !isNaN(parseFloat(price.salePrice)) ? parseFloat(price.salePrice) : 0
      });
    }
    priceListSave.detail = detailArray;

    switch (this.action) {
      case Action.Create:
        this.priceHeaderService.savePrice(priceListSave).subscribe(data => {
          this.router.navigate([this.pageRedirect]);
          this.toastr.success(`La Lista de Precios se guardo Correctamente`);
        }, error => {
          this.toastr.error(`La Lista de Precios no se guardo`);
        });
        break;
      case Action.Edit:
        this.priceHeaderService.updatePrice(priceListSave).subscribe(data => {
          this.router.navigate([this.pageRedirect]);
          this.toastr.success(`La Lista de Precios se edito correctamente`);
        }, error => {
          this.toastr.error(`La Lista de Precios no se edito`);
        });
        break;
    }
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
    this.listPrice = [];

    const reader = new FileReader();
    reader.readAsArrayBuffer(this.files);

    reader.onload = (e) => {
      let data: any = e.target.result;
      data = new Uint8Array(data);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 'A' });
      if (sheet.length !== 0) {
        const listExcelImport = sheet;
        listExcelImport.splice(0, 1);
        this.listPrice = this.setProductsImport(listExcelImport);
      } else {
        this.toastr.warning('El Documento no contiene datos');
      }
    };
    reader.onloadend = (e) => {
      event.value = '';
    };
  }

  onRemove(event): void {
    this.listPrice = [];
    this.files = this.files.filter(o => o.name !== event.file.name);
  }

  setProductsImport(data): void {
    const productsImport: any = [];
    for (const item of data) {
      const productImport: any = {
        id: 0,
        no: 0,
        saleType: null,
        carModel: null,
        carModelDr: '',
        partNumber: null,
        partNumberCustomer: '',
        component: '',
        partName: null,
        material: '',
        unit: '',
        us: null,
        option: null,
        taxName: null,
        salePrice: null
      };
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          switch (key) {
            case 'A':
              productImport.no = item[key];
              break;
            case 'B':
              productImport.saleType = item[key];
              break;
            case 'C':
              productImport.carModel = item[key];
              break;
            case 'D':
              productImport.carModelDr = item[key];
              break;
            case 'E':
              productImport.partNumber = item[key];
              break;
            case 'F':
              productImport.partNumberCustomer = item[key];
              break;
            case 'G':
              productImport.component = item[key];
              break;
            case 'H':
              productImport.partName = item[key];
              break;
            case 'I':
              productImport.material = item[key];
              break;
            case 'J':
              productImport.unit = item[key];
              break;
            case 'K':
              productImport.us = item[key];
              break;
            case 'L':
              productImport.option = item[key];
              break;
            case 'M':
              productImport.taxName = item[key];
              break;
            case 'N':
              // productImport.salePrice = item[key];
              productImport.salePrice = !isNaN(parseFloat(item[key])) ? parseFloat(item[key]) : null;
              break;
          }
        }
      }
      productsImport.push(productImport);
    }
    return productsImport;
  }

  validationItems(): void {
    this.errorsCount = 0;

    let customerId: any;
    switch (this.priceList.priceTypeId) {
      case 1:
        customerId = this.customerObj.value;
        break;
      case 2:
        if (this.listCustomersProject.length > 0) {
          customerId = this.listCustomersProject[0].customerId;
        } else {
          customerId = null;
        }
        break;
    }

    if (customerId === null) {
      this.clearFile();
      this.toastr.warning(`Debe seleccionar un Cliente o un Proyecto.`);
      return;
    }

    for (const price of this.listPrice) {

      if (price.carModel === null) {
        price.carModelError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (price.carModel === null) {
        price.carModelError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (price.partNumber !== null) {
        if (!this.listProducts.some(o => o.partNumber === price.partNumber)) {
          price.partNumberError = `Producto no existe.`;
          this.errorsCount += 1;
        } else {
          const product = this.listProducts.filter(o => o.partNumber === price.partNumber && o.customerId === customerId)[0];
          if (!product) {
            price.partNumberError = `Producto no existe.`;
            this.errorsCount += 1;
          }
        }
      } else {
        price.partNumberError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (price.partName === null) {
        price.partNameError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (price.taxName !== null) {
        if (!this.listTaxes.some(o => o.name === price.taxName)) {
          price.priceError = `Impuesto inválido.`;
          this.errorsCount += 1;
        }
      } else {
        price.priceError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      price.salePrice = !isNaN(parseFloat(price.salePrice)) ? parseFloat(price.salePrice) : null;

      if (price.salePrice === null) {
        price.salePriceError = `Dato requerido.`;
        this.errorsCount += 1;
      } else if (price.salePrice === 0) {
        price.salePriceError = `Debe ser mayor a 0.`;
        this.errorsCount += 1;
      }

    }
  }

  downloadTemplate() {
    this.downloadFileService.getTemplate(Template.TemplatePrice).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `Plantilla_Precios.xlsx`);
      });
  }
}
