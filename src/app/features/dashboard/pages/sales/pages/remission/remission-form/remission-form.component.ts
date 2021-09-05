import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { GenericDataService } from '../../../services/generic-data.service';
import { RemissionService } from '../../../services/remission.service';
import { PriceDetailService } from '../../../services/price-detail.service';
import * as moment from 'moment';
import { PriceHeaderService } from '../../../services/price-header.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderType } from '../../../../../../../shared/enums/order-type';
import { PriceListStatus } from '../../../../../../../shared/enums/price-list-status';
import { Action } from '../../../../../../../shared/enums/action';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-remission-form',
  templateUrl: './remission-form.component.html',
  styleUrls: ['./remission-form.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class RemissionFormComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public pageRedirect: string;
  public colRemission: any;
  public listRemission: any;
  public listTypeRemission: any;
  public listCustomers: any;
  public listPrices: any;
  public uploadedFiles: any;
  public disableData: boolean;
  public listPriceDetail: any;
  public remission: any;
  public listRemissions: any;
  public listProjects: any;
  public currentUser: any;
  public customerObj: any;
  public projectObj: any;
  public priceObj: any;
  public action: Action;
  public actionForm: Action;
  public itemData: any;
  public remissionDialog: boolean;
  public ref: DynamicDialogRef;
  public submitted: boolean;
  public LabelDialog: string;
  public newItemAdd: any;
  public orderTypeCustomer: OrderType;
  public orderTypeProject: OrderType;

  constructor(
    private genericDataService: GenericDataService,
    private remissionService: RemissionService,
    private projectService: ProjectsService,
    private priceListService: PriceHeaderService,
    private priceDetailService: PriceDetailService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.orderTypeCustomer = OrderType.Customer;
    this.orderTypeProject = OrderType.Project;
    this.pageRedirect = '/dashboard/sales/remission';
    this.colRemission = [];
    this.listPrices = [];
    this.listProjects = [];
    this.itemData = [];
    this.remissionDialog = false;
    this.listPriceDetail = [];
    this.submitted = false;
    this.newItemAdd = {
        carModel: '',
        carModelDr: '',
        partNumber: '',
        partNumberCustomer: '',
        component: '',
        partName: '',
        stdPack: 0,
        boxes: 0,
        quantity: 0,
        salePrice: 0
    };
    this.remission = {
      id: 0,
      orderTypeId: 1,
      customerId: null,
      projectId: null,
      remissionTypeId: null,
      priceHeaderId: null,
      address: '',
      shippingAddress: '',
      shippingDate: '',
      noOrder: null,
      customerCustomName: '',
      noOrderCustomer: null,
      observations: '',
      tarima: '',
      totalPieces: null,
      createBy: '',
      createdOn: ''
    };
    this.listTypeRemission = [];
    this.listCustomers = [];
    this.listPrices = [];
    this.uploadedFiles = [];
    this.listRemissions = [];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.colRemission = [
      { field: 'partNumber', header: 'NO. PARTE'},
      { field: 'partName', header: 'DESCRIPCIÓN'},
      { field: 'stdPack', header: 'STD PACK'},
      { field: 'quantity', header: 'CANTIDAD'},
      { field: 'boxes', header: 'CAJAS'},
      {field: '', header: ''}
    ];

    this.showForm();
  }

  editItem(event): void {
    this.actionForm = Action.Edit;
    this.LabelDialog = 'Editar Remision';
    this.itemData = event;
    this.remissionDialog = true;
    this.showFormNew();
  }

  openNew(): void {
    this.actionForm = Action.Create;
    this.LabelDialog = 'Nueva Remision';
    this.remissionDialog = true;
    this.showFormNew();
  }

  deleteItem(event): void {
    this.confirmationService.confirm({
      message: 'Desea eliminar la remision',
      header: 'Eliminar remision',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        const index = this.listRemissions.findIndex(e => e.partNumber === event.partNumber);
        this.listRemissions.splice(index, 1);
        this.remission.totalPieces = this.calculatePieces();
        this.toastr.success(`La Remission a sido eliminada correctamente`);
      }
    });
  }

  hideDialog(resp): void {
    this.remissionDialog = resp;
  }

  saveItem(): void {
    this.submitted = true;

    switch (this.actionForm) {
      case Action.Create:
        if (this.validationsItem()) {
          if (this.newItemAdd.partNumber.trim() !== '') {

            if (this.listPriceDetail.length === 0) {
              this.toastr.warning(`Debe seleccionar una lista de precios.`);
            }

            if (this.listRemissions.some(o => o.partNumber === this.newItemAdd.partNumber.trim())) {
              this.toastr.warning(
                `El No. de Parte <strong>${this.newItemAdd.partNumber.trim()}</strong> ya esta agregado en la remisión.`
              );
              this.newItemAdd.partNumber = '';
              return;
            }

            if (!this.listPriceDetail.some(o => o.partNumber === this.newItemAdd.partNumber.trim())) {
              this.toastr.warning(
                `No se encontro el No. de Parte <strong>${this.newItemAdd.partNumber.trim()}</strong> en la lista de precios selecionada.`
              );
              return;
            } else {
              const product = this.listPriceDetail.filter(o => o.partNumber === this.newItemAdd.partNumber.trim())[0];
              this.newItemAdd.carModel = product.carModel;
              this.newItemAdd.carModelDr = product.carModelDr;
              this.newItemAdd.partNumberCustomer = product.partNumberCustomer;
              this.newItemAdd.component = product.component;
              this.newItemAdd.boxes = this.newItemAdd.quantity / this.newItemAdd.stdPack;
              this.newItemAdd.salePrice = product.salePrice;

              if (Number.isInteger(this.newItemAdd.boxes)) {
                this.listRemissions.push(this.newItemAdd);
                this.remission.totalPieces = this.calculatePieces();
                this.remissionDialog = false;
                this.newItemAdd = {
                  carModel: '',
                  carModelDr: '',
                  partNumber: '',
                  partNumberCustomer: '',
                  component: '',
                  partName: '',
                  stdPack: 0,
                  boxes: 0,
                  quantity: 0,
                  salePrice: 0
                };
              } else {
                this.toastr.warning(`La cantidad ${this.newItemAdd.boxes} de cajas es invalido, solo aceptamos valores enteros`);
                return;
              }
            }
          } else {
            this.newItemAdd.partNumber = '';
            return;
          }
        } else {
          return;
        }
        break;
      case Action.Edit:
        if (this.validationsEditItem(this.newItemAdd)) {
          if (this.newItemAdd.partNumber.trim() !== '') {
            if (this.listPriceDetail.length === 0) {
              this.toastr.warning(`Debe seleccionar una lista de precios.`);
              return;
            }

            this.newItemAdd.boxes = this.newItemAdd.quantity / this.newItemAdd.stdPack;
            if (Number.isInteger(this.newItemAdd.boxes)) {
              this.remission.totalPieces = this.calculatePieces();
              const index = this.listRemissions.findIndex(e => e.partNumber === this.newItemAdd.partNumber);
              this.listRemissions[index] = this.newItemAdd;
              this.remissionDialog = false;
            } else {
              this.toastr.warning(`La cantidad ${this.newItemAdd.boxes} de cajas es invalido, solo aceptamos valores enteros`);
              return;
            }
          } else {
            this.newItemAdd.partNumber = '';
            return;
          }
        } else {
          return;
        }
        break;
    }
  }

  validationsEditItem(item) {

    if (item.stdPack === null) {
      return false;
    }

    if (item.stdPack <= 0) {
      return false;
    }

    if (item.quantity === null) {
      return false;
    }

    if (item.quantity <= 0) {
      return false;
    }

    return true;
  }

  validationsItem() {
    if (this.newItemAdd.stdPack === null) {
      return false;
    }

    if (this.newItemAdd.stdPack <= 0) {
      return false;
    }

    if (this.newItemAdd.quantity === null) {
      return false;
    }

    if (this.newItemAdd.quantity <= 0) {
      return false;
    }

    return true;
  }

  calculatePieces() {
    let totalPieces = 0;
    for (const remission of this.listRemissions) {
      totalPieces += Number(remission.quantity);
    }
    return Number(totalPieces);
  }

  blurPartNumber(): void {
    if (this.newItemAdd.partNumber.trim() !== '') {

      if (this.listPriceDetail.length === 0) {
        this.toastr.warning(`Debe seleccionar una lista de precios.`);
        return;
      }

      if (this.listRemissions.some(o => o.partNumber === this.newItemAdd.partNumber.trim())) {
        this.toastr.warning(
          `El No. de Parte <strong>${this.newItemAdd.partNumber.trim()}</strong> ya esta agregado en la remisión.`
        );
        this.newItemAdd.partNumber = '';
        return;
      }

      if (!this.listPriceDetail.some(o => o.partNumber === this.newItemAdd.partNumber.trim())) {
        this.toastr.warning(
          `No se encontro el No. de Parte <strong>${this.newItemAdd.partNumber.trim()}</strong> en la lista de precios selecionada.`
        );
        return;
      } else {
        const product = this.listPriceDetail.filter(o => o.partNumber === this.newItemAdd.partNumber.trim())[0];
        this.newItemAdd.partName = product.partName;
      }
    }
  }

  showFormNew(): void {
    switch (this.actionForm) {
      case Action.Create:
        this.newItemAdd = {
          carModel: '',
          carModelDr: '',
          partNumber: '',
          partNumberCustomer: '',
          component: '',
          partName: '',
          stdPack: 0,
          boxes: 0,
          quantity: 0,
          salePrice: 0
        };
        break;
      case Action.Edit:
        this.newItemAdd = {
          partNumber: this.itemData.partNumber,
          partName: this.itemData.partName,
          stdPack: this.itemData.stdPack,
          boxes: this.itemData.boxes,
          quantity: this.itemData.quantity,
        };
    }
  }

  showForm(): void {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addRemission':
            this.remission = {
              id: 0,
              orderTypeId: 1,
              customerId: null,
              remissionTypeId: null,
              projectId: null,
              priceHeaderId: null,
              address: '',
              shippingAddress: '',
              shippingDate: '',
              noOrder: null,
              customerCustomName: '',
              noOrderCustomer: null,
              tarima: '',
              observations: '',
              totalPieces: null,
              createBy: '',
              createdOn: ''
            };
            this.action = Action.Create;
            break;
          case 'editRemission':
            this.remission = {
              id: 0,
              orderTypeId: 1,
              customerId: null,
              projectId: null,
              remissionTypeId: null,
              priceHeaderId: null,
              address: '',
              shippingAddress: '',
              shippingDate: '',
              noOrder: null,
              customerCustomName: '',
              observations: '',
              noOrderCustomer: null,
              tarima: '',
              totalPieces: null,
              createBy: '',
              createdOn: ''
            };
            this.getOrderById(params.id);
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
    this.getRemissionType();
  }

  changeOrderType(): void {
    if (this.action !== Action.Edit) {
      this.listRemissions = [];
    }
    this.getPrices();
  }

  getOrderById(orderId): void {
    this.remissionService.getOrderById(orderId).subscribe(
      data => {
        this.remission = data;
        const [day, month, year] = moment(this.remission.shippingDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY').split('-');
        const objShippingDate = { day: parseInt(day, 0), month: parseInt(month, 0), year: parseInt(year, 0) };
        this.getOrderDetailByHeaderId(orderId);
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  getOrderDetailByHeaderId(orderHeaderId): void {
    this.remissionService.getOrderDetailByHeaderId(orderHeaderId).subscribe(
      data => {
        this.listRemissions = data;
        // this.listRemissions.map(remission => (remission.inedit = false));
        this.listRemissions.map(remission => {
          remission.inedit = false;
        });
        this.getPrices();
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  getCustomers(): void {
    this.genericDataService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  getRemissionType(): void {
    this.remissionService.getRemissionType().subscribe(
      data => {
        this.listTypeRemission = data;
    });
  }

  changeCustomer(event): void {
    if (this.action !== Action.Edit) {
      this.listRemissions = [];
      this.listPrices = [];
    }

    const customerValue = event.value;
    if (customerValue !== null) {
      this.getPrices();
    }
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      data => {
        this.listProjects = data;
        if (this.action === Action.Edit) {
          if (this.remission.projectId !== null) {
          }
        }
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  changeProject(event): void {
    if (this.action !== Action.Edit) {
      this.listRemissions = [];
      this.listPrices = [];
    }
    const projectValue = event.value;
    if (projectValue !== null) {
      this.getPrices();
    }
  }

  getPrices(): void {
    this.priceListService.getPrices(this.currentUser.userName).subscribe(
      data => {
        switch (this.remission.orderTypeId) {
          case this.orderTypeCustomer:
            this.listPrices = data.filter(o => o.priceTypeId === 1 && o.customerId === this.remission.customerId);
            break;
          case this.orderTypeProject:
            this.listPrices = data.filter(o => o.priceTypeId === 2 && o.projectId === this.remission.projectId);
            break;
        }
        this.listPrices = [...this.listPrices.filter(price => price.priceStatusId === PriceListStatus.Authorized)];
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  changePrice(event): void {
    if (this.action !== Action.Edit) {
      this.listRemissions = [];
      this.listPriceDetail = [];
    }
    const priceValue = event.value;
    if (priceValue !== null) {
      this.getPriceDetailByHeaderId(priceValue);
    }
  }

  getPriceDetailByHeaderId(priceHeaderId): void {
    this.priceDetailService.getPriceDetailByHeaderId(priceHeaderId).subscribe(
      data => {
        this.listPriceDetail = data;
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  customerData(event): void {
    const customer = this.listCustomers.filter(o => o.id === event.value);

    if (customer[0].stateProvinceName !== null && customer[0].cityName !== null &&
        customer[0].neighborhoodName !== null && customer[0].street !== null && customer[0].zipCode !== null) {
      this.disableData = true;
      this.remission.address = `Estado de ${customer[0].stateProvinceName}, Ciudad ${customer[0].cityName}, Colonia ${customer[0].neighborhoodName}, Calle ${customer[0].street}, C.P.${customer[0].zipCode}`;
    } else {
      this.remission.address = 'N/A';
      this.disableData = false;
    }
  }

  saveForm(): void {
    this.submitted = true;

    if (this.listRemissions.length === 0) {
      this.toastr.warning('Debe agregar al menos 1 registro a la lista de precios.');
      return;
    }

    let index = 1;
    for (const remission of this.listRemissions) {

      if (remission.stdPack === 0) {
        this.toastr.warning(`El STD PACK debe ser mayor a 0 en el registro No. ${index}.`);
        return;
      }

      if (remission.quantity === 0) {
       this.toastr.warning(`La CANTIDAD debe ser mayor a 0 en el registro No. ${index}.`);
       return;
     }

      index++;
    }

    const remissionSave: any = {};

    remissionSave.id = this.remission.id;
    remissionSave.orderTypeId = this.remission.orderTypeId;
    remissionSave.customerId = this.remission.orderTypeId === this.orderTypeCustomer ? this.remission.customerId : null;
    remissionSave.remissionTypeId = this.remission.remissionTypeId;
    remissionSave.projectId = this.remission.orderTypeId === this.orderTypeProject ? this.remission.projectId : null;
    remissionSave.priceHeaderId = this.remission.priceHeaderId;
    remissionSave.address = this.remission.address;
    remissionSave.shippingAddress = this.remission.shippingAddress;
    remissionSave.shippingDate = moment(this.remission.shippingDate, 'YYYY-MM-DD');
    remissionSave.noOrder = this.remission.noOrder;
    remissionSave.customerCustomName = this.remission.customerCustomName;
    remissionSave.noOrderCustomer = this.remission.noOrderCustomer;
    remissionSave.tarima = this.remission.tarima;
    remissionSave.totalPieces = this.remission.totalPieces;
    remissionSave.observations = this.remission.observations;
    remissionSave.createBy = this.currentUser.userName;

    const detailArray = [];
    for (const remission of this.listRemissions) {

      detailArray.push({
        id: remission.id === undefined ? 0 : remission.id,
        carModel: remission.carModel,
        carModelDr: remission.carModelDr,
        partNumber: remission.partNumber,
        partNumberCustomer: remission.partNumberCustomer,
        component: remission.component,
        partName: remission.partName,
        stdPack: remission.stdPack,
        boxes: remission.boxes,
        quantity: remission.quantity,
        salePrice: remission.salePrice
      });
    }

    remissionSave.detail = detailArray;

    switch (this.action) {
      case Action.Create:
        this.remissionService.saveOrder(remissionSave).subscribe(data => {
          this.router.navigate([this.pageRedirect]);
          this.toastr.success(`La remision se ha creado correctamente`);
        }, error => {
          this.toastr.error('No se guardo correctamente');
        });
        break;
      case Action.Edit:
        this.remissionService.updateOrder(remissionSave).subscribe(data => {
          this.router.navigate([this.pageRedirect]);
          this.toastr.success(`La remision se ha editando correctamente`);
        }, error => {
          this.toastr.error('No se edito correctamente');
        });
        break;
    }
  }

}
