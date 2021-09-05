import { Component, OnInit, ViewChild } from '@angular/core';
import { TableListComponent } from '../../../../../../../shared/components/table-list/table-list.component';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { UserAuthenticationModel } from '@app/core/models/auth.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [ConfirmationService]
})
export class ProductsListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public headers: any;
  public listProducts: any;
  public loadingTable: boolean;
  public currentUser: any;

  constructor(
    private productService: ProductsService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.headers = [];
    this.listProducts = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'no', header: 'No', width: 'col-w lg' },
      { field: 'productTypeName', header: 'Tipo de Producto', width: 'col-w lg' },
      { field: 'customerName', header: 'Cliente', width: 'col-w lg' },
      { field: 'carModel', header: 'Car/Mod', width: 'col-w lg' },
      { field: 'carModelDr', header: 'Car/ModDr', width: 'col-w lg' },
      { field: 'partNumber', header: 'Parte No.', width: 'col-w lg' },
      { field: 'partNumberCustomer', header: 'Cliente Parte No.', width: 'col-w lg' },
      { field: 'productLevelName', header: 'Nivel de Producto', width: 'col-w lg' },
      { field: 'component', header: 'Componente', width: 'col-w lg' },
      { field: 'partName', header: 'Parte', width: 'col-w lg' },
      { field: 'grade', header: 'Grado', width: 'col-w lg' },
      { field: 'msSpec', header: 'Ms/Spec', width: 'col-w lg' },
      { field: 'supplier', header: 'Proveedor', width: 'col-w lg' },
      { field: 'use', header: 'Uso', width: 'col-w lg' },
      { field: 'cTime', header: 'C/Time', width: 'col-w lg' },
      { field: 'cv', header: 'C/V', width: 'col-w lg' },
      { field: 'weight', header: 'Peso', width: 'col-w lg' },
      { field: 'actualWeight', header: 'Peso Actual', width: 'col-w lg' },
      { field: 'ttlKg', header: 'Ttl/Kg', width: 'col-w lg' },
      { field: 'unitMeasureName', header: 'Unidad de Medida', width: 'col-w lg' },
      { field: 'unitSale', header: 'Unidad de Venta', width: 'col-w lg' },
      { field: 'option', header: 'Opción', width: 'col-w lg' },
      { field: 'remark', header: 'Observaciones', width: 'col-w lg' },
      { field: 'satPSCodeFulllName', header: 'Código SAT Producto/Servicio', width: 'col-w xxxxl' },
      { field: 'satUCodeFulllName', header: 'Código de Unidad SAT', width: 'col-w xxl' }
    ];

    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.listProducts = data;
        this.listProducts.map(o => {
          o.satPSCodeFulllName = `${o.claveProdServSATCode} - ${o.claveProdServSATName}`;
          o.satUCodeFulllName = `${o.claveUnidadSATCode} - ${o.claveUnidadSATName}`;
        });
      });
  }

  refreshData(): void {
    this.getProducts();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Productos`, true, headersExcel);
  }

  deleteItem(value): void {
    this.confirmationService.confirm({
      message: 'Esta Seguro de Borrar este Producto?',
      header: 'Borrar Producto',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.productService.deleteProduct(value.id, this.currentUser.userName).subscribe(
          data => {
            this.toastr.success(`El Producto ${value.name} se borrado correctamente`);
            this.getProducts();
          },
          error => {
            this.toastr.error(`Algo Salio mal en el servicio`);
          });
      }
    });
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/catalogs/products/editProduct/${event.id}`]);
  }

}
