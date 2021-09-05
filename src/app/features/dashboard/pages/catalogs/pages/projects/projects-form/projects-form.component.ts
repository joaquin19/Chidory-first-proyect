import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Action } from '../../../../../../../shared/enums/action';
import { GenericDataService } from '../../../../sales/services/generic-data.service';
import { ProjectsService } from '../../../../sales/services/projects.service';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.scss']
})
export class ProjectsFormComponent implements OnInit {
  public listCustomers: any;
  public customerData: any;
  public listProjectCustomers: any;
  public project: any;
  public currentUser: any;
  public startDate: Date;
  public endDate: Date;
  public action: Action;
  public listProjects: any;
  public submitted: boolean;

  constructor(
    public ref: DynamicDialogRef,
    private genericDataService: GenericDataService,
    public config: DynamicDialogConfig,
    private toastr: ToastrService,
    private projectService: ProjectsService,
  ) {
    this.submitted = false;
    this.listCustomers = [];
    this.customerData = [];
    this.listProjectCustomers = [];
    this.listProjects = [];
    this.action = this.config.data.type;
    this.project = {
      id: 0,
      name: '',
      startDate: null,
      endDate: null,
      createBy: '',
      customerId: null
    };
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.showForm();
  }

  showForm(): void {
    switch (this.action) {
      case Action.Create:
        this.project = {
          id: 0,
          name: '',
          startDate: null,
          endDate: null,
          createBy: '',
          customerId: null
        };
        break;
      case Action.Edit:
        this.project = {
          id: this.config.data.id,
          name: this.config.data.name,
          startDate: this.config.data.startDate,
          endDate: this.config.data.endDate,
          createBy: this.config.data.createdBy
        };
    }
    this.getCustomers();
  }

  getCustomers(): void {
    this.genericDataService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
        if (this.action === Action.Edit) {
          this.getProjectCustomers(this.project.id);
        }
      });
  }

  getProjectCustomers(projectId): void {
    this.genericDataService.getProjectCustomers(projectId).subscribe(
      data => {
        this.customerData = this.listCustomers.filter(e => data.some(o => o.customerId === e.id));
      });
  }

  closeProject(resp): void {
    this.ref.close(resp);
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      data => {
        this.listProjects = data;
      });
  }

  dateSelectStart(): void {
    const startDate = moment(this.project.startDate).format('YYYY-MM-DD');
    const endDate = moment(this.project.endDate).format('YYYY-MM-DD');
    const toDay = moment().toDate().toString();

    if (startDate > endDate) {
      this.project.startDate = new Date();
      this.toastr.warning(`La Fecha de Inicio debe ser menor o igual a la Fecha de Fin.`);
    }
  }

  dateSelectEnd(): void {
    const startDate = moment(this.project.startDate).format('YYYY-MM-DD');
    const endDate = moment(this.project.endDate).format('YYYY-MM-DD');

    if (endDate < startDate) {
      this.project.endDate = new Date();
      this.toastr.warning(`La Fecha de Fin debe ser mayor o igual a la Fecha de Inicio.`);
    }
  }

  refresh(): void {
    this.getProjects();
  }

  saveProject(): void {
    this.submitted = true;

    const projectSave: any = {};
    projectSave.id = this.project.id;
    projectSave.name = this.project.name;
    projectSave.startDate = moment(this.project.startDate, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD');
    projectSave.endDate = moment(this.project.endDate, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD');
    projectSave.createBy = this.currentUser.userName;
    const customersVal: any = [];
    for (const item of this.customerData) {
      customersVal.push({customerId: item.id});
    }
    projectSave.detail = customersVal;

    switch (this.action) {
      case Action.Create:
        this.projectService.saveProjects(projectSave).subscribe(data => {
          this.refresh();
          this.ref.close(false);
          this.toastr.success(`El Proyecto ${this.project.name} se guardo Correctamente`);
        }, error => {
          this.toastr.error(`El Proyecto ${this.project.name} no se guardo`);
        });
        break;
      case Action.Edit:
        this.projectService.updateProjects(projectSave).subscribe(data => {
          this.getProjects();
          this.toastr.success(`El Proyecto ${this.project.name} se edito correctamente`);
          this.ref.close(false);
        }, error => {
          this.toastr.error(`El Proyecto ${this.project.name} no se edito`);
        });
        break;
    }
  }
}
