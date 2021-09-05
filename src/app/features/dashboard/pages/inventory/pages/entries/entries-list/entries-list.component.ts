import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { EntriesFormComponent } from '../entries-form/entries-form.component';
import { EntriesComponent } from '../entries.component';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss']
})
export class EntriesListComponent implements OnInit {

  public ref: DynamicDialogRef;

  public tableList: TableListComponent;

  public headers: any;
  public listData: any;
  public loadingTable: boolean;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    this.headers = [];
    this.listData = [];
    this.loadingTable = false;
  }

  ngOnInit(): void {
    this.headers = [
      { field: 'id', header: 'NO' },
      { field: 'model', header: 'MODEL' },
      { field: 'client', header: 'CLIENT' },
      { field: 'part1', header: 'PART 1' },
      { field: 'part2', header: 'PART 2' },
      { field: 'code1', header: 'CODE NO' },
      { field: 'code2', header: '2nd CODE NO' },
      { field: 'partName', header: 'PART NAME' },
      { field: 'quantity', header: 'QUANTITY' }
    ];

    this.getData();
  }

  getData(): void {
    this.listData = [
      {
        id: 1,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '456456464654B',
        code2: '',
        partName: 'PE',
        quantity: 0
      },
      {
        id: 2,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '8489646478943B',
        code2: '',
        partName: 'PE-OF(TUBE, PE)',
        quantity: 0
      },
      {
        id: 3,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '7897987622127B',
        code2: '',
        partName: 'PU',
        quantity: 0
      },
      {
        id: 4,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '968563569876B',
        code2: '',
        partName: 'PU',
        quantity: 0
      },
      {
        id: 5,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '213111311231B',
        code2: '',
        partName: 'PU',
        quantity: 0
      },
      {
        id: 6,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '9873651421123B',
        code2: '',
        partName: 'PU',
        quantity: 0
      },
      {
        id: 7,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '6876143213BS',
        code2: '',
        partName: 'PU',
        quantity: 0
      },
      {
        id: 8,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '68635431366V',
        code2: '',
        partName: 'PU',
        quantity: 0
      },
      {
        id: 9,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '6546456454487E',
        code2: '',
        partName: 'PU',
        quantity: 0
      },
      {
        id: 10,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '322123132154678R',
        code2: '',
        partName: 'PU',
        quantity: 0
      },
      {
        id: 11,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '32132156445478C',
        code2: '',
        partName: 'PE(WHITE)',
        quantity: 0
      },
      {
        id: 12,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '9687445643655W',
        code2: '',
        partName: 'PE',
        quantity: 0
      },
      {
        id: 13,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '45645655658985B',
        code2: '',
        partName: 'PE',
        quantity: 0
      },
      {
        id: 14,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '5487793562321E',
        code2: '',
        partName: 'PE + AL',
        quantity: 0
      },
      {
        id: 15,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '548987665478Q',
        code2: '',
        partName: 'PU(WHITE)',
        quantity: 0
      },
      {
        id: 16,
        model: 'LG PU',
        client: 'LG',
        part1: 'PAD',
        part2: 'kyoungrim',
        code1: '456456464654B',
        code2: '',
        partName: 'PU(WHITE)',
        quantity: 0
      }
    ];
  }

  refreshData(): void {
    this.getData();
  }

  exportExcel(): void {
    const headersExcel: any = {};
    for (const item of this.headers) {
      headersExcel[`${item.field}`] = item.header;
    }
    this.tableList.exportExcel(`Listado de Entradas Almacén`, true, headersExcel);
  }

  editItem(event): void {
    this.openModal(event);
  }

  newEntry(): void {
    const data = {};
    this.openModal(data);
  }

  openModal(data): void {
    this.ref = this.dialogService.open(EntriesFormComponent, {
      data,
      header: 'Entrada a Almacén',
      width: '50%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Guardado correctamente.'
      });
    });
  }

}
