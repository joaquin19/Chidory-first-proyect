import { Component, OnInit, ViewChild } from '@angular/core';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';

@Component({
  selector: 'app-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.scss']
})
export class IncomeStatementComponent implements OnInit {

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;
  public colIncome: any;
  public listIncome: any;
  public subSectionIncome: any;
  public subTypeIncome1: any;
  public subTypeIncome2: any;
  public subTypeIncome3: any;
  public subTypeIncome4: any;
  public listIncome2: any;
  public listIncome3: any;
  public listIncome4: any;

  constructor() {
    this.colIncome = [

      { ventas: 'Ventas', costoVentas: 'Costo de Ventas', gVA: 'Gastos de Ventas y Administrativos',
        gastosFin: 'Gastos Financieros', utitlitiNet: 'Utilidad Neta(o Perdida Neto)',
        valueUtiliti: '$8,786,501.00', utiliti: 'Utilidad o Perdida', valueUtil: '$ 39,221.00' },
      {typeId: 1,
        subType1: [
          {field: 'cppt', header: 'Costo de producto terminado'},
          {field: 'impp', header: 'Inventarios de materias primas principal'},
          {field: 'iptpanual', header: '(Inventarios de productos terminados principa del año)'},
          {field: 'import', header: 'Importado'},
          {field: 'local', header: 'Local'},
          {field: 'productfinal', header: 'Productos Terminados'},
          {field: 'inventariFinal', header: 'Inventarios de Final'},
          {field: 'nominaPlanta', header: 'Nomina Planta + (IMSS+RCV+INF)'},
          {field: 'productionCost', header: 'Costo de Produccion'},
        ],
        subType2: [
          {field: 'costPT', header: 'Costo de producto terminado'},
          {field: 'invMaaterial', header: 'Inventarios de materias primas principal'},
          {field: 'importado', header: 'Importado'},
          {field: 'locals', header: 'Local'},
          {field: 'productTerm', header: 'Productos Terminados'},
          {field: 'finalInv', header: 'Inventarios de Final'},
          {field: 'pantNomina', header: 'Nomina Planta + (IMSS+RCV+INF)'},
          {field: 'costProduction', header: 'Costo de Produccion'},
          ],
        subType3: [
          {field: 'numberDeducible', header: 'No deducible'},
          {field: 'gasolina', header: 'Gasolina'},
          {field: 'fletes', header: 'Fletes'},
          {field: 'viajes', header: 'Viajes'},
          {field: 'hospitalidad', header: 'Hospitalidad'},
          {field: 'honorarios', header: 'Honorarios y complementos Aduanal'},
          {field: 'consultores', header: 'Consultores'},
          {field: 'asistencia', header: 'Asistencia tecnica'},
          {field: 'nomianAdmin', header: 'Nomina Adminitrativa (Oficina)'},
          {field: 'nominaOficcer', header: 'Nomina Officers Salaries(Nomina Administrativa)'},
          {field: 'nominaIMSS', header: 'Nomina IMSS,RCV,INFONAVIT(Empleados)'},
          {field: 'beneficioService', header: 'Beneficios Servicio de comedor'},
          {field: 'beneficioTrans', header: 'Beneficios Transporte de Personal'},
          {field: 'beneficioUnif', header: 'Beneficios Uniformes'},
          {field: 'beneficioApoyo', header: 'Beneficios Apoyo de Escuela y Guarderias'},
          {field: 'beneficioEvento', header: 'Beneficios Evento para Empleados'},
          {field: 'rentaEquipo', header: 'Renta Equipos'},
          {field: 'rentaBodega', header: 'Renta bodega'},
          {field: 'comunication', header: 'Comunicacion'},
          {field: 'consumElect', header: 'Consumo de Electricidad (De SLP OFICINA)'},
          {field: 'arrendamineto', header: 'Arrendamiento Puro'},
          {field: 'suministros', header: 'Suministros de Oficina'},
          {field: 'cuotaMtto', header: 'Cuota de Mtto.'},
          {field: 'mttoVehiculo', header: 'Mtto.Vehiculos'}
        ],
        subType4: [
          {field: 'comisionBancaria', header: 'Comisiones de Bancarias'},
          {field: 'lostchange', header: 'Perdida cambiaria'},
          {field: 'payTax', header: 'Intereses pagado'},
          {field: 'otroGasto', header: 'Otro gasto'},
        ],
      }
    ];
    this.subSectionIncome = [];
    this.listIncome = [];
  }

  ngOnInit(): void {

    const subSectionIncome = this.colIncome.filter(item => item.typeId === 1);
    const subTypeIncome1 = subSectionIncome[0].subType1;
    const subTypeIncome2 = subSectionIncome[0].subType2;
    const subTypeIncome3 = subSectionIncome[0].subType3;
    const subTypeIncome4 = subSectionIncome[0].subType4;
    this.subSectionIncome = subSectionIncome;
    this.subTypeIncome1 = subTypeIncome1;
    this.subTypeIncome2 = subTypeIncome2;
    this.subTypeIncome3 = subTypeIncome3;
    this.subTypeIncome4 = subTypeIncome4;

    this.listIncome = [
      {field: 'cppt', header: '$0.00'},
      {field: 'impp', header: '$0.00'},
      {field: 'iptpanual', header: '$0.00'},
      {field: 'import', header: '$0.00'},
      {field: 'local', header: '$0.00'},
      {field: 'productfinal', header: '$0.00'},
      {field: 'inventariFinal', header: '$0.00'},
      {field: 'nominaPlanta', header: '$0.00'},
      {field: 'productionCost', header: '$0.00'},
    ];
    this.listIncome2 = [
      {field: 'costPT', header: '$0.00'},
      {field: 'invMaaterial', header: '$0.00'},
      {field: 'importado', header: '$0.00'},
      {field: 'locals', header: '$0.00'},
      {field: 'productTerm', header: '$0.00'},
      {field: 'finalInv', header: '$0.00'},
      {field: 'pantNomina', header: '$0.00'},
      {field: 'costProduction', header: '$0.00'},
    ];
    this.listIncome3 = [
      {field: 'numberDeducible', header: '$0.00'},
      {field: 'gasolina', header: '$0.00'},
      {field: 'fletes', header: '$0.00'},
      {field: 'viajes', header: '$0.00'},
      {field: 'hospitalidad', header: '$0.00'},
      {field: 'honorarios', header: '$0.00'},
      {field: 'consultores', header: '$0.00'},
      {field: 'asistencia', header: '$0.00'},
      {field: 'nomianAdmin', header: '$0.00'},
      {field: 'nominaOficcer', header: '$0.00'},
      {field: 'nominaIMSS', header: '$0.00'},
      {field: 'beneficioService', header: '$0.00'},
      {field: 'beneficioTrans', header: '$0.00'},
      {field: 'beneficioUnif', header: '$0.00'},
      {field: 'beneficioApoyo', header: '$0.00'},
      {field: 'beneficioEvento', header: '$0.00'},
      {field: 'rentaEquipo', header: '$0.00'},
      {field: 'rentaBodega', header: '$0.00'},
      {field: 'comunication', header: '$0.00'},
      {field: 'consumElect', header: '$0.00'},
      {field: 'arrendamineto', header: '$0.00'},
      {field: 'suministros', header: '$0.00'},
      {field: 'cuotaMtto', header: '$0.00'},
      {field: 'mttoVehiculo', header: '$0.00'},
    ];
    this.listIncome4 = [
      {field: 'comisionBancaria', header: '$0.00'},
      {field: 'lostchange', header: '$0.00'},
      {field: 'payTax', header: '$0.00'},
      {field: 'otroGasto', header: '$0.00'},
    ];
  }

}
