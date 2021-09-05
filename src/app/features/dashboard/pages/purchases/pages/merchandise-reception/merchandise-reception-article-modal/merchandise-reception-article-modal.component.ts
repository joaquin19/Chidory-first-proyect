import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { format } from 'node:path';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MerchandiseReceptionHeaderService } from '../../../services/merchandise-reception-header.service';

@Component({
  selector: 'app-merchandise-reception-article-modal',
  templateUrl: './merchandise-reception-article-modal.component.html',
  styleUrls: ['./merchandise-reception-article-modal.component.scss']
})
export class MerchandiseReceptionArticleModalComponent implements OnInit {

  public merchandiseReceptionEdition: any;
  public merchandiseReceptionDocument: any;
  public currentUser: any;
  public files: any;
  public merchandiseReception: any;
  public articles: any;
  public listImageNames: any;
  public fileUploadImageMerchandise: any;
  public typesFiles: string[];
  public submitted: boolean;

  constructor(
    public ref: DynamicDialogRef,
    private router: Router,
    private toastr: ToastrService,
    private merchandiseReceptionService: MerchandiseReceptionHeaderService,
    public config: DynamicDialogConfig
  ) {
    this.files = [];
    this.typesFiles = ['.png', '.jpg', 'jpeg'];
    this.listImageNames = [];
    this.fileUploadImageMerchandise = [];
    this.merchandiseReception = {
      folio: '',
      purchaseOrderHeaderId: 0,
      supplierId: 0,
      statusId: 0,
      statusName: '',
      supplierName: '',
      receptionDate: '1900-01-01'
    };
    this.articles = {
      id: 0,
      merchandiseReceptionHeaderId: 0,
      purchaseOrderHeaderId: 0,
      articleId: 0,
      code: '',
      fullName: '',
      description: '',
      quantity: 0,
      receptionDate: '',
      receivedQuantity: 0,
      pendingQuantity: 0,
      lastRecord: 0,
      subTotal: 0,
      total: 0
    };
    this.merchandiseReceptionEdition = {
      id: 0,
      merchandiseReceptionHeaderId: 0,
      purchaseOrderHeaderId: 0,
      articleId: 0,
      name: '',
      description: '',
      fullName: '',
      pendingQuantity: 0,
      newPendingQuantity: 0,
      quantity: 0,
      receptionDate: '',
      receivedQuantity: 0,
      newReceivedQuantity: 0,
      unitMeasureId: 0,
      unitMeasureName: '',
      unitPrice: 0
    };
    this.merchandiseReceptionDocument = [{
      id: 0,
      path: '',
      merchandiseReceptionHeaderId: 0,
      merchandiseReceptionDetailId: 0,
      systemName: '',
      userName: ''
    }];
    this.submitted = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.merchandiseReceptionEdition = this.config.data;
    this.merchandiseReceptionEdition.newPendingQuantity = this.config.data.pendingQuantity;
    if (this.merchandiseReceptionEdition.merchandiseReceptionHeaderId !== 0) {
      this.getMerchandiseReceptionDetailByPOD();
    }
  }

  getMerchandiseReceptionDetailByPOD(): void {
    this.merchandiseReceptionService.getMerchandiseReceptionDocumentsByMRD(
      this.merchandiseReceptionEdition.merchandiseReceptionHeaderId,
      this.merchandiseReceptionEdition.id).subscribe(
        data => {
          this.merchandiseReceptionDocument = data;
        },
        error => {
          this.toastr.error(error.message);
        });
  }

  getMerchandiseReception(purchaseOrderHeaderId): void {
    this.merchandiseReceptionService.getMerchandiseReceptionByPurchaseOrderId(purchaseOrderHeaderId).subscribe(
      data => {
        this.merchandiseReception = data;
        this.getMerchandiseReceptionDetail();
      });
  }

  getMerchandiseReceptionDetail(): void {
    this.merchandiseReceptionService.getMerchandiseReceptionDetailByPOH(this.merchandiseReception.purchaseOrderHeaderId).subscribe(
      data => {
        this.articles = data;
      });
  }

  blurQuantity(event): void {
    const element = event.target;
    const valueQuantity = parseInt(element.value, 0);

    if (!isNaN(valueQuantity)) {
      this.merchandiseReceptionEdition.newPendingQuantity = this.merchandiseReceptionEdition.pendingQuantity - valueQuantity;
      if (this.merchandiseReceptionEdition.newPendingQuantity < 0) {
        this.merchandiseReceptionEdition.newPendingQuantity = 0;
      }
    }
  }

  saveForm(): void {
    this.submitted = true;
    if (this.files.length === 0) {
      this.toastr.error('Favor de seleccionar al menos un archivo');
      return;
    }

    if (this.files.length > 6) {
      this.toastr.error('Son seis archivos máximo de evidencia');
      return;
    }

    const merchandiseReceptionSave: any = {};

    merchandiseReceptionSave.id = this.merchandiseReceptionEdition.id;
    merchandiseReceptionSave.merchandiseReceptionHeaderId = this.merchandiseReceptionEdition.merchandiseReceptionHeaderId;
    merchandiseReceptionSave.purchaseOrderHeaderId = this.merchandiseReceptionEdition.purchaseOrderHeaderId;
    merchandiseReceptionSave.articleId = this.merchandiseReceptionEdition.articleId;
    merchandiseReceptionSave.pendingQuantity = parseInt(this.merchandiseReceptionEdition.newPendingQuantity, 0);
    merchandiseReceptionSave.quantity = this.merchandiseReceptionEdition.quantity;
    merchandiseReceptionSave.receivedQuantity = parseInt(this.merchandiseReceptionEdition.newReceivedQuantity, 0);
    merchandiseReceptionSave.createBy = this.currentUser.userName;
    merchandiseReceptionSave.receptionDate = moment(this.merchandiseReceptionEdition.receptionDate).format('YYYY-MM-DD');

    merchandiseReceptionSave.merchandiseReceptionDocument = [];

    merchandiseReceptionSave.merchandiseReceptionDocument.push({
      id: 1,
      userName: this.files.name,
      systemName: '',
      path: ''
    });

    const formData = new FormData();
    formData.append('files', this.files, this.files.name);

    formData.append('merchandiseReceptionSave', JSON.stringify(merchandiseReceptionSave));

    this.merchandiseReceptionService.saveMerchandiseReceptionDetail(formData).subscribe(data => {
      this.toastr.success('Mercancía recepcionada correctamente.');
      this.getMerchandiseReception(merchandiseReceptionSave.purchaseOrderHeaderId);
      this.router.navigate([`/dashboard/purchases/merchandise-reception/editMerchandiseReception/${merchandiseReceptionSave.purchaseOrderHeaderId}`]);
      this.ref.close(false);
    }, error => {
      this.toastr.error(error.message);
    });
  }

  documentSelect(event): void {
    let fileExtension = '';
    for (const file of event.currentFiles) {
      fileExtension = (file.name.substr(file.name.lastIndexOf('.'))).toLowerCase();
      if (this.typesFiles.indexOf(fileExtension) === -1) {
        this.toastr.warning(`Solo se permiten archivos de tipo ${this.typesFiles}`);
        return;
      }
    }

    this.files = event.currentFiles[0];

    this.listImageNames = [];
    for (let index = 0; index < event.target.files.length; index++) {
      this.files.push(event.target.files[index]);
      this.listImageNames[index] = event.target.files[index].name;
    }
  }

  onRemove(event): void {
    this.files = this.files.filter(o => o.name !== event.file.name);
  }

  closeForm(value): void {
    this.ref.close(value);
  }

}
