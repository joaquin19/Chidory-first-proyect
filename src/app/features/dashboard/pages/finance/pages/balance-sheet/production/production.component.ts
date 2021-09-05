import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { BalanceSheetService } from '../../../service/balance-sheet.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public colProduction: any;
  public subSectionProduction: any;
  public subTypeProduction1: any;
  public subTypeProduction2: any;
  public subTypeProduction3: any;
  public listProduction: any;
  public listProduction2: any;
  public listProduction3: any;

  constructor(
    private balanceSheetService: BalanceSheetService,
    private toastr: ToastrService
  ) {
    this.colProduction = [

      { costoMateriaPrima: 'Costo de Materia Prima', costoLaboral: 'Costo Laboral (Nomina)',
        gastosProduccion: 'Gastos de Produccion', costoTotal: 'Costo Total de Fabricacion', valueTotal: '$56,000.00' },
      {typeId: 1,
        subType1: [
          {field: 'invMateriaPrimas', header: 'Inventarios de materias primas principal'},
          {field: 'materiaPrimCost', header: 'Costo de materias primas comprado (IMPORTADO)'},
          {field: 'matPrimCostLocal', header: 'Costo de materias primas comprado (LOCAL)'},
          {field: 'PrudctFinish', header: 'Productos terminados'},
          {field: 'inventariFinal', header: 'Inventarios de Final'},
        ],
        subType2: [
          {field: 'nominaP', header: 'Nomina Planta'},
          {field: 'imss', header: 'IMSS,RCV,INF'},
          {field: 'finiquito', header: 'Finiquitos y Aguinaldos y Prima de vacacional'},
          ],
        subType3: [
          {field: 'sumPlanta', header: 'Suministros de Planta'},
          {field: 'serviceManOb', header: 'Servicio de Mano de Obra'},
          {field: 'sumSecurity', header: 'Suministro de Seguridad'},
          {field: 'consElect', header: 'Consumo de Electricidad (Planta MTY)'},
          {field: 'consAgua', header: 'Consumo de Agua para Maquinas'},
          {field: 'consGas', header: 'Consumo de Gas'},
          {field: 'empaque', header: 'Empaque'},
          {field: 'basura', header: 'Compilacion de Basura'},
          {field: 'mttoPlant', header: 'Mtto.Planta'},
          {field: 'mttoMachine', header: 'Mtto.Maquinas'},
          {field: 'mttoInyection', header: 'Mtto. Mold de Inyeccion'},
          {field: 'honorarioRHH', header: 'Honorarios de recurso humano'},
          {field: 'depreciaciones', header: 'Depreciacaiones (Edificio, Maquinas, Equipos, Camiones)'},
        ],
      }
    ];
    this.subSectionProduction = [];
    this.listProduction = [];
  }

  ngOnInit(): void {
    const subSectionProduction = this.colProduction.filter(item => item.typeId === 1);
    const subTypeProduction1 = subSectionProduction[0].subType1;
    const subTypeProduction2 = subSectionProduction[0].subType2;
    const subTypeProduction3 = subSectionProduction[0].subType3;
    this.subSectionProduction = subSectionProduction;
    this.subTypeProduction1 = subTypeProduction1;
    this.subTypeProduction2 = subTypeProduction2;
    this.subTypeProduction3 = subTypeProduction3;
    this.listProduction = [
      {field: 'invMateriaPrimas', header: '$0.00'},
      {field: 'materiaPrimCost', header: '$0.00'},
      {field: 'matPrimCostLocal', header: '$0.00'},
      {field: 'PrudctFinish', header: '$0.00'},
      {field: 'inventariFinal', header: '$0.00'},
    ];
    this.listProduction2 = [
      {field: 'nominaP', header: '$0.00'},
      {field: 'imss', header: '$0.00'},
      {field: 'finiquito', header: '$0.00'},
    ];
    this.listProduction3 = [
      {field: 'sumPlanta', header: '$0.00'},
      {field: 'serviceManOb', header: '$0.00'},
      {field: 'sumSecurity', header: '$0.00'},
      {field: 'consElect', header: '$0.00'},
      {field: 'consAgua', header: '$0.00'},
      {field: 'consGas', header: '$0.00'},
      {field: 'empaque', header: '$0.00'},
      {field: 'basura', header: '$0.00'},
      {field: 'mttoPlant', header: '$0.00'},
      {field: 'mttoMachine', header: '$0.00'},
      {field: 'mttoInyection', header: '$0.00'},
      {field: 'honorarioRHH', header: '$0.00'},
      {field: 'depreciaciones', header: '$0.00'},
    ];
  }

}
