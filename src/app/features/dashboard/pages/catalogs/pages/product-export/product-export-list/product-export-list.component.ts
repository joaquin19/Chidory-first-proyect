import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { TableListComponent } from '@app/shared/components/table-list/table-list.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { FormatColumn } from '../../../../../../../shared/enums/format-column';
import { ExportProductService } from '../../../services/export-product.service';

@Component({
  selector: 'app-product-export-list',
  templateUrl: './product-export-list.component.html',
  styleUrls: ['./product-export-list.component.scss']
})
export class ProductExportListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public headers: any;
  public listProductsExport: any;
  public loadingTable: boolean;
  public currentUser: any;

  constructor(
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private router: Router,
    private exportProductService: ExportProductService
  ) {
    this.headers = [];
    this.listProductsExport = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.headers = [
      { field: 'customerName', header: 'Cliente', width: 'col-w lg' },
      { field: 'currencyFullName', header: 'Moneda', width: 'col-w lg' },
      { field: 'satPSCodeFulllName', header: 'Código SAT Producto/Servicio', width: 'col-w xxxxl' },
      { field: 'satUCodeFulllName', header: 'Código de Unidad SAT', width: 'col-w xxl' },
      { field: 'model', header: 'Modelo', width: 'col-w lg' },
      { field: 'partNumber', header: 'Número de Parte', width: 'col-w xxl' },
      { field: 'partDescription', header: 'Descripción', width: 'col-w lg' },
      { field: 'unitPrice', header: 'Precio Unitario', width: 'col-w lg', fromat: FormatColumn.Currency },
      { field: 'widthSize', header: 'Ancho', width: 'col-w lg' },
      { field: 'lengthSize', header: 'Largo', width: 'col-w lg' },
      { field: 'heightSize', header: 'Alto', width: 'col-w lg' },
      { field: 'widthSizePacking', header: 'Empaquetado - Ancho', width: 'col-w xxl' },
      { field: 'lengthSizePacking', header: 'Empaquetado - Largo', width: 'col-w xxl' },
      { field: 'heightSizePacking', header: 'Empaquetado - Alto', width: 'col-w xxl' },
      { field: 'cmb', header: 'Metros Cúbicos', width: 'col-w lg' },
      { field: 'weight', header: 'Peso', width: 'col-w lg' },
      { field: 'packingQuantity', header: 'Cantidad Empaquetado', width: 'col-w xxl' },
      { field: 'hsCode', header: 'HS Code', width: 'col-w lg' },
      { field: 'material', header: 'Material', width: 'col-w lg' },
      { field: 'division', header: 'División', width: 'col-w lg' },
      { field: 'qaInspection', header: 'QA Inspección', width: 'col-w lg' }

    ];

    this.getProducts();
  }

  getProducts(): void {
    this.exportProductService.getExportProducts().subscribe(
      data => {
        this.listProductsExport = data;
        this.listProductsExport.map(o => {
          o.currencyFullName = `${o.currencyCode} - ${o.currencyName}`;
          o.satPSCodeFulllName = `${o.claveProdServSATCode} - ${o.claveProdServSATName}`;
          o.satUCodeFulllName = `${o.claveUnidadSATCode} - ${o.claveUnidadSATName}`;
        });
        this.loadingTable = false;
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
    this.tableList.exportExcel(`Lista de Productos de Exportación `, true, headersExcel);
  }

  deleteItem(value): void {
    this.confirmationService.confirm({
      message: 'Esta Seguro de Borrar este Producto de Exportación?',
      header: 'Borrar Producto de Exportación',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectVisible: false,
      accept: () => {
        this.exportProductService.deleteExportProduct(value.id, this.currentUser.userName).subscribe(
          data => {
            this.toastr.success(`El Producto se ha borrado correctamente`);
            this.getProducts();
          });
      }
    });
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/catalogs/products-export/editProductExport/${event.id}`]);
  }

}
