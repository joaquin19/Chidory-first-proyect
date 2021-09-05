import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthorizerService } from '../../../services/authorizer.service';
import { ProcessTypeService } from '../../../services/process-type.service';
import { UserSystemService } from '../../../services/user-system.service';

@Component({
  selector: 'app-authorizers-form',
  templateUrl: './authorizers-form.component.html',
  styleUrls: ['./authorizers-form.component.scss']
})
export class AuthorizersFormComponent implements OnInit {

  public currentUser: any;
  public authorizer: any;
  public action: Action;
  public isReadOnly: boolean;
  public submitted: boolean;
  public listAuthorizer: any;
  public listProcessType: any;
  public listUsersSystem: any;

  constructor(
    private toastr: ToastrService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public authorizerService: AuthorizerService,
    public processTypeService: ProcessTypeService,
    public userSystemService: UserSystemService
  ) {
    this.authorizer = {};
    this.submitted = false;
    this.isReadOnly = false;
    this.listAuthorizer = [];
    this.listProcessType = [];
    this.listUsersSystem = [];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    const dataReceived = this.config.data;
    this.authorizer = dataReceived.authorizer;
    this.action = dataReceived.action;
    if (this.action === Action.Edit) {
      this.isReadOnly = true;
    }
    this.getUsersSystem();
    this.getProcessType();
  }

  getUsersSystem(): void {
    this.userSystemService.getUsersSystem().subscribe(
      data => {
        this.listUsersSystem = data;
      });
  }

  getProcessType(): void {
    this.processTypeService.getProcessTypes().subscribe(
      data => {
        this.listProcessType = data;
      });
  }

  saveForm(): void {

    this.submitted = true;

    if (this.authorizer.processTypeId == undefined || this.authorizer.userSystemId == undefined) {
      return;
    }

    const authorizerSave: any = {};

    authorizerSave.id = this.authorizer.id;
    authorizerSave.processTypeId = this.authorizer.processTypeId;
    authorizerSave.userSystemId = this.authorizer.userSystemId;
    authorizerSave.sortOrder = this.authorizer.sortOrder;
    authorizerSave.required = this.authorizer.required;
    authorizerSave.createBy = this.currentUser.userName;

    console.log(authorizerSave);

    switch (this.action) {
      case Action.Create:
        this.authorizerService.saveAuthorizer(authorizerSave).subscribe(data => {
          this.toastr.success('Autorizador guardado correctamente.');
          this.closeForm(true);
        });
        break;
      case Action.Edit:
        this.authorizerService.updateAuthorizer(authorizerSave).subscribe(data => {
          this.toastr.success('Autorizador editado correctamente.');
          this.closeForm(true);
        });
        break;
    }
  }

  closeForm(value): void {
    this.ref.close(value);
  }

}
