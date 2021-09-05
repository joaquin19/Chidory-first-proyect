import { Component, OnInit } from '@angular/core';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GenericDataService } from '../../../../sales/services/generic-data.service';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.scss']
})
export class ProjectsDetailComponent implements OnInit {

  public projectDetail: any;
  public currentUser: any;
  public listCustomers: any;
  public listProjectCustomers: any;

  constructor(
    public ref: DynamicDialogRef,
    private genericDataService: GenericDataService,
    public config: DynamicDialogConfig,
  ) {
    this.listProjectCustomers = [];
    this.listCustomers = [];
    this.projectDetail = {
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

    this.projectDetail = {
      id: this.config.data.id,
      name: this.config.data.name,
      startDate: this.config.data.startDate,
      endDate: this.config.data.endDate,
      createBy: this.config.data.createBy,
      customerId: null
    };
    this.getCustomers();
  }

  getCustomers(): void {
    this.genericDataService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
        if (this.listCustomers !== null) {
          this.getProjectCustomers();
        }
      });
  }

  getProjectCustomers(): void {
    this.genericDataService.getProjectCustomers(this.projectDetail.id).subscribe(
      data => {
        this.listProjectCustomers = this.listCustomers.filter(e => data.some(o => o.customerId === e.id));
      });
  }

  closeProject(resp): void {
    this.ref.close(resp);
  }

}
