import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthorizerService } from '../../../services/authorizer.service';

@Component({
  selector: 'app-authorizers-order-form',
  templateUrl: './authorizers-order-form.component.html',
  styleUrls: ['./authorizers-order-form.component.scss']
})
export class AuthorizersOrderFormComponent implements OnInit {

  public submitted: boolean;
  public listAuthorizers: any;
  public currentUser: any;
  public cols: any;

  constructor(
    private toastr: ToastrService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public authorizerService: AuthorizerService
  ) {
    this.submitted = false;
    this.listAuthorizers = {};
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    const dataReceived = this.config.data;
    this.cols = [
      { field: 'sortOrder', header: 'Orden', width: 'col-w md' },
      { field: 'userName', header: 'Usuario', width: 'col-w xl' },
      { field: 'fullName', header: 'Nombre', width: 'col-w xl' }
    ];
    this.getAuthorizerByProcessTypeId(dataReceived.processTypeId);
  }

  getAuthorizerByProcessTypeId(processTypeId) {
    this.authorizerService.getAuthorizerByProcessTypeId(processTypeId).subscribe(
      data => {
        this.listAuthorizers = data;
      });
  }

  saveForm(): void {

    this.submitted = true;

    const authorizerOrderSave: any = {};

    const authorizersArray = [];
    let order = 1;
    this.listAuthorizers.forEach(element => {
      authorizersArray.push({
        id: element.id,
        sortOrder: order
      });
      order++;
    });

    authorizerOrderSave.authorizers = authorizersArray;
    authorizerOrderSave.createBy = this.currentUser.userName;

    this.authorizerService.updateAuthorizerOrder(authorizerOrderSave).subscribe(data => {
      this.toastr.success('Orden de Autorizadores editado correctamente.');
      this.closeForm(true);
    });
  }

  closeForm(value): void {
    this.ref.close(value);
  }

}
