import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BusinessUnitService, CostCenterService } from '../../../services';

@Component({
  selector: 'app-sub-categories-form',
  templateUrl: './sub-categories-form.component.html',
  styleUrls: ['./sub-categories-form.component.scss']
})
export class SubCategoriesFormComponent implements OnInit {

  public subCategory: any;
  public listBusinessUnits: any;
  public submitted: boolean;
  public currentUser: any;
  public action: Action;
  public isReadOnly: boolean;

  constructor(
    private toastr: ToastrService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public businessUnitService: BusinessUnitService,
    public costCenterService: CostCenterService
  ) {
    this.subCategory = {
      id: 0,
      name_NM: '',
      description_DES: ''
    };
    this.listBusinessUnits = [];
    this.submitted = false;
    this.isReadOnly = false;
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    const dataReceived = this.config.data;
    this.subCategory = dataReceived.subCategory;
    this.action = dataReceived.action;
    console.log(this.action);
    if (this.action === Action.Edit) {
      this.isReadOnly = true;
    }
    this.getBusinessUnits();
  }

  getBusinessUnits(): void {
    this.businessUnitService.getBusinessUnits().subscribe(
      data => {
        this.listBusinessUnits = data;
      },
      error => {
        this.toastr.error(error.message);
      });
  }

  closeForm(value): void {
    this.ref.close(value);
  }

  saveForm(): void {

    this.submitted = true;
    if (this.subCategory.name === undefined || this.subCategory.description === undefined || this.subCategory.businessUnitId === undefined) {
      return;
    }

    const subCategorySave: any = {};

    subCategorySave.id = this.subCategory.id;
    subCategorySave.name = this.subCategory.name;
    subCategorySave.description = this.subCategory.description;
    subCategorySave.businessUnitId = this.subCategory.businessUnitId;
    subCategorySave.createBy = this.currentUser.userName;

    switch (this.action) {
      case Action.Create:
        this.costCenterService.saveCostCenter(subCategorySave).subscribe(data => {
          this.toastr.success('Sub Categoría guardada correctamente.');
          this.closeForm(true);
        });
        break;
      case Action.Edit:
        this.costCenterService.updateCostCenter(subCategorySave).subscribe(data => {
          this.toastr.success('Sub Categoría editada correctamente.');
          this.closeForm(true);
        });
        break;
    }
  }

}