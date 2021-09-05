import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BalanceSheetFormComponent } from '../balance-sheet-form/balance-sheet-form.component';
import { BalanceSheetDetailComponent } from '../balance-sheet-detail/balance-sheet-detail.component';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-balance-sheet-list',
  templateUrl: './balance-sheet-list.component.html',
  styleUrls: ['./balance-sheet-list.component.scss']
})
export class BalanceSheetListComponent implements OnInit, OnDestroy {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public valueStep: number = 1;
  public loadingTable: boolean;
  public navHeader: any[];
  public ref: DynamicDialogRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService
   ) {

    this.navHeader = [
      { icon: 'pi pi-chart-line', value: 1, label: 'Balance Sheet' },
      { icon: 'pi pi-book', value: 2, label: 'Income Statement' },
      { icon: 'pi pi-chart-bar', value: 3, label: 'Production' },
    ];
    this.loadingTable = false;
   }

  ngOnInit(): void {
  }

  showDetailInvoice(): void {
    this.ref = this.dialogService.open(BalanceSheetFormComponent, {
        header: 'Detalle de Factura',
        width: '70%',
        contentStyle: {'max-height': '500px', 'overflow': 'auto'},
        baseZIndex: 10000
    });
  }

  ngOnDestroy(): void {
      if (this.ref) {
          this.ref.close();
      }
  }

  showInvoiceType(value): void {
    this.valueStep = value;
  }

  refreshDataBalance(): void {
  }

  refreshDataIncome(): void {
  }

  refreshDataProduction(): void {
  }

  detailItem(event): void {
    this.ref = this.dialogService.open(BalanceSheetDetailComponent, {
      header: 'Detalle Facturas',
      width: '70%',
      contentStyle: {'max-height': '500px', 'overflow': 'auto'},
      baseZIndex: 10000
  });
  }

  editItem(event): void {
    this.router.navigate([`/dashboard/invoice/invoices/editInvoice/${event.id}`]);
    console.log('editItem', event.id);
  }
}
