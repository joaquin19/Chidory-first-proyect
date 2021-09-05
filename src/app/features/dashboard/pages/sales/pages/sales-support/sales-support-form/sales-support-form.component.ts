import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { TreeDragDropService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { Action, FormatColumn } from '@app/shared/enums';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { TableListSimpleComponent } from '@app/shared/components/table-list-simple/table-list-simple.component';
import {
  OrderDetailService, OrderHeaderService, SalesSupportDetailService, SalesSupportHeaderService
} from '../../../services';
import { CurrencyService, CustomerService } from '@app/features/dashboard/pages/catalogs/services';

@Component({
  selector: 'app-sales-support-form',
  templateUrl: './sales-support-form.component.html',
  providers: [TreeDragDropService, MessageService],
  styleUrls: ['./sales-support-form.component.scss']
})
export class SalesSupportFormComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListSimpleComponent;
  public pageRedirect: string;
  public files2: TreeNode[];
  public files3: TreeNode[];
  public colSupport: any;
  public listSupport: any;
  public salesSupport: any;
  public actionForm: Action;
  public listCurrencies: any;
  public listModel: any;
  public listCustomers: any;
  public listSalesSupport: any;
  public listRemissionAll: any;
  public listReportSalesSupport: any;
  public listRemissionCreated: any;
  public submitted: boolean;
  public currentUser: any;
  public isReadOnly: boolean;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public salesSupportHeaderService: SalesSupportHeaderService,
    public currencyService: CurrencyService,
    public customerService: CustomerService,
    public orderHeaderService: OrderHeaderService,
    public orderDetailService: OrderDetailService,
    public salesSupportDetailService: SalesSupportDetailService,
    public saleSupportHeaderService: SalesSupportHeaderService
  ) {
    this.salesSupport = [];
    this.colSupport = [];
    this.listSupport = [];
    this.listCurrencies = [];
    this.listModel = [];
    this.listCustomers = [];
    this.listSalesSupport = [];
    this.listRemissionAll = [];
    this.listReportSalesSupport = [];
    this.listRemissionCreated = [];
    this.pageRedirect = '/dashboard/sales/sales-report';
    this.submitted = false;
    this.isReadOnly = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.files2 = [{
      label: 'Backup',
      data: 'Backup Folder',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder'
    }
    ];

    this.files3 = [{
      label: 'Storage',
      data: 'Storage Folder',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder'
    }
    ];

    this.colSupport = [
      { width: 'col-w lg', field: 'shippingDate', header: 'FECHA', format: FormatColumn.Date },
      { width: 'col-w xl', field: 'folio', header: 'FOLIO REMISIÓN' },
      { width: 'col-w lg', field: 'partName', header: 'NO. PARTE' },
      { width: 'col-w lg', field: 'quantity', header: 'CANTIDAD', format: FormatColumn.Quantity },
      { width: 'col-w xl', field: 'salePrice', header: 'PRECIO UNITARIO', format: FormatColumn.Currency },
      { width: 'col-w lg', field: 'subTotal', header: 'SUB TOTAL', format: FormatColumn.Currency },
      { width: 'col-w lg', field: 'reference', header: 'REMISIÓN' },
      { width: 'col-w lg', field: 'observations', header: 'MODELO' }
    ];
    this.showForm();
  }

  showForm(): void {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addSalesReport':
            this.salesSupport = {
              id: 0,
              customerId: null,
              createBy: '',
              startDate: null,
              endDate: null,
              carModel: null,
              purchaseOrder: null,
              createdOn: ''
            };
            this.salesSupport.startDate = moment().toDate();
            this.salesSupport.endDate = moment().toDate();
            this.actionForm = Action.Create;
            break;
          case 'editSalesReport':
            this.actionForm = Action.Edit;
            this.isReadOnly = true;
            this.getSaleSupportHeaderId(params.id);
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
    this.getCurrencies();
  }

  getSaleSupportHeaderId(saleSupportId): void {
    this.salesSupportHeaderService.getSaleSupportById(saleSupportId).subscribe(
      data => {
        this.salesSupport = data;
        if (this.salesSupport.startDate != null) {
          this.salesSupport.startDate = moment(this.salesSupport.startDate, 'DD-MM-YYYY').toDate();
          this.salesSupport.endDate = moment(this.salesSupport.endDate, 'DD-MM-YYYY').toDate();
        } else {
          this.salesSupport.estimatedDate = (moment().toDate());
          this.salesSupport.endDate = (moment().add(7, 'days').toDate());
        }
        this.getModels();
        this.getSaleSupportDetail(this.salesSupport.id);
      });
  }

  getCurrencies(): void {
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
      });
  }

  getModels(): void {
    if (this.salesSupport.customerId == null && this.actionForm === Action.Create) {
      return;
    }

    if (this.salesSupport.startDate == null && this.actionForm === Action.Create) {
      return;
    }

    if (this.salesSupport.endDate == null && this.actionForm === Action.Create) {
      return;
    }

    if (this.salesSupport.currencyId == null && this.actionForm === Action.Create) {
      return;
    }

    const customerId = this.salesSupport.customerId;
    const currencyId = this.salesSupport.currencyId;

    const startDate = moment(this.salesSupport.startDate).format('YYYY-MM-DD');
    const endDate = moment(this.salesSupport.endDate).format('YYYY-MM-DD');

    this.saleSupportHeaderService.getSaleSupportModels(customerId, startDate, endDate, currencyId).subscribe(
      data => {
        this.listModel = data;
      });
  }

  getCustomers(): void {
    this.customerService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
      });
  }

  // getOrdersByCustomerId(): void {
  //   if (this.salesSupport.customerId == null && this.actionForm === Action.Create) {
  //     return;
  //   }

  //   if (this.salesSupport.currencyId == null && this.actionForm === Action.Create) {
  //     return;
  //   }

  //   const customerId = this.salesSupport.customerId;
  //   const currencyId = this.salesSupport.currencyId;

  //   const startDate = moment(this.salesSupport.startDate).format('YYYY-MM-DD');
  //   const endDate = moment(this.salesSupport.endDate).format('YYYY-MM-DD');
  //   const saleSupportHeaderId = this.salesSupport.id;

  //   this.orderHeaderService.getOrdersByCustomerId(customerId, currencyId, startDate, endDate, saleSupportHeaderId).subscribe(
  //     data => {
  //       this.listRemissionAll = data;
  //       this.listRemissionAll.forEach(element => {
  //         element.name = element.folio;
  //         element.code = element.id;
  //       });
  //       switch (this.actionForm) {
  //         case Action.Create:
  //           const value = this.listReportSalesSupport.map(i => i.id);
  //           this.listRemissionCreated = this.listRemissionAll.filter(item => !value.includes(item.id));
  //           break;
  //         case Action.Edit:
  //           this.getSaleSupportDetail(this.salesSupport.id);
  //           break;
  //       }

  //     });
  // }

  getSaleSupportDetail(saleSupportHeaderId): void {
    this.salesSupportDetailService.getSaleSupportDetailByHeaderId(saleSupportHeaderId).subscribe(
      data => {
        this.listSalesSupport = data;

        // const mapValue = this.listSalesSupport.map(o => o.orderHeaderId);
        // this.listReportSalesSupport = this.listRemissionAll.filter(item => mapValue.includes(item.id));

        // const value = this.listReportSalesSupport.map(i => i.id);
        // this.listRemissionCreated = this.listRemissionAll.filter(item => !value.includes(item.id));

      });
  }

  saveForm(): void {
    this.submitted = true;

    // if (this.formSalesSupport.invalid) {
    //   return;
    // }

    if (this.listSalesSupport.length === 0) {
      this.toastr.warning('Favor de ingresar al menos una remisión');
      return;
    }
    const salesSupportSave: any = {};

    salesSupportSave.id = this.salesSupport.id;
    salesSupportSave.customerId = this.salesSupport.customerId;
    salesSupportSave.currencyId = this.salesSupport.currencyId;
    salesSupportSave.projectId = this.listRemissionCreated.projectId;
    salesSupportSave.createBy = this.currentUser.userName;
    salesSupportSave.startDate = moment(this.salesSupport.startDate).format('YYYY-MM-DD');
    salesSupportSave.endDate = moment(this.salesSupport.endDate).format('YYYY-MM-DD');
    salesSupportSave.purchaseOrder = this.salesSupport.purchaseOrder;

    const detailArray = [];
    for (const saleSupport of this.listSalesSupport) {
      detailArray.push({
        id: saleSupport.id,
        saleSupportHeaderId: saleSupport.saleSupportHeaderId,
        orderHeaderId: saleSupport.orderHeaderId,
        folio: saleSupport.folio,
        shippingDate: saleSupport.shippingDate,
        carModel: saleSupport.carModel,
        carModelDr: saleSupport.carModelDr,
        partNumber: saleSupport.partNumber,
        partNumberCustomer: saleSupport.partNumberCustomer,
        component: saleSupport.component,
        partName: saleSupport.partName,
        quantity: saleSupport.quantity,
        salePrice: saleSupport.salePrice,
        subTotal: saleSupport.subTotal,
        total: saleSupport.total,
        reference: saleSupport.reference,
        observations: saleSupport.observations
      });
    }
    salesSupportSave.detail = detailArray;

    switch (this.actionForm) {
      case Action.Create:
        this.saleSupportHeaderService.saveSaleSupport(salesSupportSave).subscribe(data => {
          this.toastr.success('Soporte de venta guardada correctamente.');
          this.router.navigate([this.pageRedirect]);
        }, error => {
          this.toastr.error(error.message);
        });
        break;
      case Action.Edit:
        this.saleSupportHeaderService.updateSaleSupport(salesSupportSave).subscribe(data => {
          this.toastr.success('Soporte de venta editada correctamente.');
          this.router.navigate([this.pageRedirect]);
        }, error => {
          this.toastr.error(error.message);
        });
        break;
    }
  }

  // actionComplete(args): void {
  //   if (args.items !== undefined) {
  //     const order = this.listSalesSupport.filter(o => o.orderHeaderId === args.items[0].id);
  //     if (order.length > 0) {
  //       this.deleteOrderDetail(args.items[0]);
  //     } else {
  //       this.getOrderDetailByHeaderId(args.items[0]);
  //     }
  //   }
  // }

  // deleteOrderDetail(order): void {
  //   this.listReportSalesSupport = this.listReportSalesSupport.filter(o => o.id !== order.id);
  //   this.listSalesSupport = this.listSalesSupport.filter(o => o.orderHeaderId !== order.id);
  // }

  // getOrderDetailByHeaderId(order): void {
  //   this.orderDetailService.getOrderDetailByHeaderId(order.id).subscribe(
  //     data => {
  //       let listData = [];
  //       listData = data;
  //       listData.forEach(orderDetail => {
  //         const element: any = {};
  //         element.folio = order.folio;
  //         element.orderHeaderId = order.id;
  //         element.shippingDate = order.shippingDate;
  //         element.carModel = orderDetail.carModel;
  //         element.carModelDr = orderDetail.carModelDr;
  //         element.partNumber = orderDetail.partNumber;
  //         element.partNumberCustomer = orderDetail.partNumberCustomer;
  //         element.component = orderDetail.component;
  //         element.partName = orderDetail.partName;
  //         element.quantity = orderDetail.quantity;
  //         element.salePrice = orderDetail.salePrice;
  //         element.subTotal = element.quantity * element.salePrice;
  //         element.total = 0;
  //         element.reference = order.id;
  //         element.observations = orderDetail.carModel;
  //         this.listSalesSupport.push(element);
  //       });
  //     });
  // }

  changeCustomer(): void {
    const customerId = this.salesSupport.customerId;
    if (customerId !== null && this.actionForm !== Action.Edit) {
      this.getModels();
    }
  }

  changeCurrency(): void {
    const currencyId = this.salesSupport.currencyId;
    if (currencyId !== null && this.actionForm !== Action.Edit) {
      this.getModels();
    }
  }

  dateSelectStart(): void {
    if (this.salesSupport.startDate > this.salesSupport.endDate) {
      this.salesSupport.startDate = moment().toDate();
      this.toastr.warning('La Fecha de Inicio debe ser menor o igual a la Fecha de Fin.');
    }
    this.getModels();
  }

  dateSelectEnd(): void {
    if (this.salesSupport.endDate < this.salesSupport.startDate) {
      this.salesSupport.endDate = moment().toDate();
      this.toastr.warning('La Fecha de Fin debe ser mayor o igual a la Fecha de Inicio.');
    }
    this.getModels();
  }

  changeModel(): void {
    const model = this.salesSupport.carModel;
    this.getOrderDetailByModel(model);
  }

  getOrderDetailByModel(model): void {

    if (this.salesSupport.customerId == null && this.actionForm === Action.Create) {
      return;
    }

    if (this.salesSupport.startDate == null && this.actionForm === Action.Create) {
      return;
    }

    if (this.salesSupport.endDate == null && this.actionForm === Action.Create) {
      return;
    }

    if (this.salesSupport.currencyId == null && this.actionForm === Action.Create) {
      return;
    }

    const customerId = this.salesSupport.customerId;
    const currencyId = this.salesSupport.currencyId;

    const startDate = moment(this.salesSupport.startDate).format('YYYY-MM-DD');
    const endDate = moment(this.salesSupport.endDate).format('YYYY-MM-DD');

    this.orderDetailService.getOrderDetailByModel(customerId, startDate, endDate, currencyId, model).subscribe(
      data => {
        let listData = [];
        listData = data;
        listData.forEach(orderDetail => {
          const element: any = {};
          element.folio = orderDetail.folio;
          element.orderHeaderId = orderDetail.orderHeaderId;
          element.shippingDate = orderDetail.shippingDate;
          element.carModel = orderDetail.carModel;
          element.carModelDr = orderDetail.carModelDr;
          element.partNumber = orderDetail.partNumber;
          element.partNumberCustomer = orderDetail.partNumberCustomer;
          element.component = orderDetail.component;
          element.partName = orderDetail.partName;
          element.quantity = orderDetail.quantity;
          element.salePrice = orderDetail.salePrice;
          element.subTotal = element.quantity * element.salePrice;
          element.total = 0;
          element.reference = orderDetail.orderHeaderId;
          element.observations = orderDetail.carModel;
          this.listSalesSupport.push(element);
        });
      });
  }

}
