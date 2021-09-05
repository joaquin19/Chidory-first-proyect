import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileSystemService } from '../../../service';
import { TableListComponent } from '@app/shared/components/table-list/table-list.component';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public listCustomers: any;
  public headers: any;

  constructor(
    private router: Router,
    private profileSystemService: ProfileSystemService
  ) {
    this.listCustomers = [];
    this.headers = [];
  }

  ngOnInit(): void {
    this.headers = [
      { field: 'name', header: 'Nombre', width: 'col-w xlg' },
      { field: 'description', header: 'Nombre', width: 'col-w xxlg' }
    ];

    this.getProfilesSystem();
  }

  getProfilesSystem() {
    this.profileSystemService.getProfilesSystem().subscribe(
      data => {
        this.listCustomers = data;
      });
  }

  refreshData(): void {
    this.getProfilesSystem();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Catálogo de Autorizadores`, true, headersExcel);
  }

  newItem(): void {
    this.router.navigate(['/dashboard/settings/profiles/addProfile']);
  }

  editItem(event): void {
    console.log('editItem', event);
    this.router.navigate(['/dashboard/settings/profiles/editProfile', event.id]);
  }

  deleteItem(event): void {
    console.log('deleteItem', event);
  }

}
