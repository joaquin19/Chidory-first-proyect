import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { ProjectsDetailComponent } from '../projects-detail/projects-detail.component';
import { ProjectsFormComponent } from '../projects-form/projects-form.component';
import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { ToastrService } from 'ngx-toastr';
import { ProjectsService } from '../../../../sales/services/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class ProjectsListComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colProjects: any;
  public listProjects: any;
  public loadingTable: boolean;
  public displayModal: boolean;
  public date1: Date;
  public date2: Date;
  public currentUser: any;
  public ref: DynamicDialogRef;

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private toastr: ToastrService,
    public messageService: MessageService,
    public projectService: ProjectsService
   ) {
    this.colProjects = [];
    this.listProjects = [];
    this.loadingTable = false;
   }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.colProjects = [
      { width: 'col-w md', field: 'name', header: 'Proyecto'},
      { width: 'col-w lg', field: 'startDate', header: 'Feha Inicio Vigencia'},
      { width: 'col-w lg', field: 'endDate', header: 'Feha Final Vigencia'}
    ];
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      data => {
        data.map(project => (
          project.startDate = moment(project.startDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'),
          project.endDate = moment(project.endDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')
        ));
        this.listProjects = data;
      },
      error => {
    });
  }

  refreshData(): void {
    this.getProjects();
  }

  deleteItem(value): void {
    this.confirmationService.confirm({
        message: 'Esta Seguro de Borrar este Proyecto?',
        header: 'Borrar Proyecto',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-danger',
        rejectVisible: false,
        accept: () => {
          this.projectService.deleteProjects(value.id, this.currentUser.userName).subscribe(
            data => {
              this.toastr.success(`El  Proyecto ${value.name} se borrado correctamente`);
              this.getProjects();
            },
            error => {
              this.toastr.error(`Algo Salio mal en el servicio`);
            });
        }
    });
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.colProjects) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Lista de Proyectos`, true, headersExcel);
  }

  editItem(event): void {
    event.header = 'Editar Proyecto';
    event.type = 2;
    this.openModal(event);
  }

  newItem(): void {
    const data = {
      header: 'Nuevo Proyecto',
      type: 1
    };
    this.openModal(data);
  }


  detailItem(event): void {
    this.ref = this.dialogService.open(ProjectsDetailComponent, {
      data: event,
      header: 'Detalle de Proyecto',
      width: '70%',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      baseZIndex: 10000
    });
  }

  openModal(value): void {
    this.ref = this.dialogService.open(ProjectsFormComponent, {
      data: value,
      header: value.header,
      width: '70%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (value.type === 1) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Artículo guardado correctamente.'
        });
      } else if (value.type === 2) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Artículo editado correctamente.'
        });
      }
    });
  }

}
