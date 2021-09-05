import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { UserSystemService, ProfileSystemService } from '../../../service';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { GenericDataService } from '../../../../sales/services/generic-data.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  public currentUser: any;
  public user: any;
  public listProfiles: any;
  public listDepartment: any;
  public submitted: boolean;
  public listData: any;
  public action: number;

  constructor(
    // private departmentservice: DepartmentService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private userSystemService: UserSystemService,
    private genericDataService: GenericDataService,
    private profileSystemService: ProfileSystemService,
    private toastr: ToastrService
  ) {
    this.action = this.config.data.type;
    this.listData = [];
    this.user = {
      id: 0,
      profileId: null,
      profileName: '',
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      userName: '',
      active: false
    };
    this.listProfiles = [];
    this.listDepartment = [];
    this.submitted = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.showForm();
  }

  showForm(): void {
    switch (this.action) {
      case 1:
        this.user = {
          id: 0,
          profileId: null,
          profileName: '',
          firstName: '',
          lastName: '',
          fullName: '',
          email: '',
          userName: '',
          active: false
        };
        break;
      case 2:
        this.user = {
          id: this.config?.data?.id,
          profileId: this.config?.data?.profileId,
          profileName: this.config?.data?.profileName,
          departmentId: this.config?.data?.departmentId,
          departmentName: this.config?.data?.departmentName,
          firstName: this.config?.data?.firstName,
          lastName: this.config?.data?.lastName,
          fullName: this.config?.data?.fullName,
          email: this.config?.data?.email,
          userName: this.config?.data?.userName,
          active: this.config?.data?.active
        };
        break;
    }

    this.getProfilesSystem();
    this.getDepartments();
  }

  getProfilesSystem(): void {
    this.profileSystemService.getProfilesSystem().subscribe(
      data => {
        this.listProfiles = data;
        // this.profileObj.value = this.action === Action.Edit ? this.user.profileId : null;
      });
  }

  getDepartments(): void {
    this.genericDataService.getDepartment().subscribe(
      data => {
        this.listDepartment = data;
      });
  }

  getData(): void {
    this.userSystemService.getUsersSystem().subscribe(
      data => {
        this.listData = data;
      });
  }

  closeForm(resp): void {
    this.ref.close(resp);
  }

  saveForm(): void {
    this.submitted = true;

    const userSave: any = {};

    userSave.id = this.user.id;
    userSave.profileId = this.user.profileId;
    const departmentData = this.listDepartment.filter(e => this.user.departmentId === e.id);
    userSave.code = departmentData[0].code;
    userSave.departmentName = departmentData[0].name;
    userSave.departmentId = this.user.departmentId;
    userSave.firstName = this.user.firstName.trim();
    userSave.lastName = this.user.lastName.trim();
    userSave.email = this.user.email.trim();
    userSave.createBy = this.currentUser.userName;

    switch (this.action) {
      case 1:
        this.userSystemService.saveUserSystem(userSave).subscribe(data => {
          this.getData();
          this.ref.close(false);
          this.toastr.success(`El Usuario ${this.user.name} se guardo Correctamente`);
        }, error => {
          this.toastr.error(`El Usuario ${this.user.name} no se guardo`);
        });
        break;
      case 2:
        this.userSystemService.updateUserSystem(userSave).subscribe(data => {
          this.getData();
          this.toastr.success(`El Usuario ${this.user.name} se edito correctamente`);
          this.ref.close(false);
        }, error => {
          this.toastr.error(`El Usuario ${this.user.name} no se edito`);
        });
        break;
    }
  }

}
