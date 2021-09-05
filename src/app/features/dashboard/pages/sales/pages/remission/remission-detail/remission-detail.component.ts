import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { RemissionService } from '../../../services/remission.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { LocalImagesService } from '@app/shared/services/local-images.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-remission-detail',
  templateUrl: './remission-detail.component.html',
  styleUrls: ['./remission-detail.component.scss']
})
export class RemissionDetailComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colRemissionDetail: any;
  public listRemissionDetail: any;
  public remission: any;
  public listRemissions: any;
  public logo: any;

  constructor(
    public config: DynamicDialogConfig,
    private remissionService: RemissionService,
    private localImagesService: LocalImagesService,
  ) {
    this.remission = [];
    this.listRemissions = [];
    this.colRemissionDetail = [];
    this.logo = '';
    this.listRemissionDetail = [];
  }

  ngOnInit(): void {
    this.colRemissionDetail = [
      { field: 'partNumber', header: 'NO. PARTE', width: 'col-w xlg' },
      { field: 'partName', header: 'DESCRIPCIÓN', width: 'col-w xlg' },
      { field: 'stdPack', header: 'STD PACK', width: 'col-w xlg' },
      { field: 'quantity', header: 'CANTIDAD', width: 'col-w xlg' },
      { field: 'boxes', header: 'CAJAS', width: 'col-w sm' }
    ];
    this.getOrderById(this.config.data.id);
    this.getLogo();
  }

  getLogo(): void {
    this.localImagesService.getLogo().subscribe(res => {
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(res);
      reader.onloadend = () => {
        this.logo = reader.result;
      }
    });
  }

  getOrderById(orderId): void {
    this.remissionService.getOrderById(orderId).subscribe(
      data => {
        this.remission = data;
        this.remission.shippingDate = moment(`${this.remission.shippingDate}`, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.getOrderDetailByHeaderId(orderId);
      });
  }

  getOrderDetailByHeaderId(orderHeaderId): void {
    this.remissionService.getOrderDetailByHeaderId(orderHeaderId).subscribe(
      data => {
        this.listRemissions = data;
      });
  }

  downloadPDF(): void {
    const dateCreateOn = (moment(`${this.remission.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const purchaseOrderNamePDF = `O${this.remission.id}(${this.remission.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.remissionService.getDocumentDefinition(this.colRemissionDetail, this.listRemissions,
        this.remission, this.logo);
    pdfMake.createPdf(documentDefinition).download(purchaseOrderNamePDF);
  }

  showPDF(): void {
    const documentDefinition =
      this.remissionService.getDocumentDefinition(this.colRemissionDetail, this.listRemissions,
        this.remission, this.logo);
    pdfMake.createPdf(documentDefinition).open();
  }

}
