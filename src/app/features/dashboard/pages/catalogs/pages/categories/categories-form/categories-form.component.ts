import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action } from '@app/shared/enums';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BusinessUnitService } from '../../../services';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  public category: any;
  public submitted: boolean;
  public action: Action;
  public currentUser: any;
  public dataReceived: any;

  constructor(
    private toastr: ToastrService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public businessUnitService: BusinessUnitService
  ) {
    this.category = {
      id: 0,
      name: '',
      description: ''
    };
    this.submitted = false;
    this.dataReceived = {};
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.dataReceived = { ...this.config.data };
    this.category = this.dataReceived.category;
    this.action = this.dataReceived.action;
  }

  closeForm(value): void {
    this.ref.close(value);
  }

  saveForm(): void {

    this.submitted = true;

    if (this.category.name === undefined || this.category.description === undefined) {
      return;
    }

    const categorySave: any = {};

    categorySave.id = this.category.id;
    categorySave.name = this.category.name;
    categorySave.description = this.category.description;
    categorySave.createBy = this.currentUser.userName;

    switch (this.action) {
      case Action.Create:
        this.businessUnitService.saveBusinessUnit(categorySave).subscribe(data => {
          this.toastr.success('Categoría guardada correctamente.');
          this.closeForm(true);
        });
        break;
      case Action.Edit:
        this.businessUnitService.updateBusinessUnit(categorySave).subscribe(data => {
          this.toastr.success('Categoría editada correctamente.');
          this.closeForm(true);
        });
        break;
    }
  }

}
