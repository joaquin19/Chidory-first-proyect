import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { BalanceSheetService } from '../../../service';

@Component({
  selector: 'app-balance-sheet-data',
  templateUrl: './balance-sheet-data.component.html',
  styleUrls: ['./balance-sheet-data.component.scss']
})
export class BalanceSheetDataComponent implements OnInit {

  public listActivBalance: any;

  @ViewChild('tableList', { static: false })
  public tableList: TableListComponent;

  public colBalance: any;
  public colBalanceSection: any;
  public subSectionBalance: any;
  public typeBalance: any;
  public subTypeBalance1: any;
  public subTypeBalance2: any;
  public subTypeBalance3: any;
  public subTypeBalance4: any;
  public subTypeBalance5: any;
  public subTypeBalance6: any;
  public subTypeBalance7: any;
  public subTypeBalance8: any;
  public subTypeBalance9: any;
  public subTypeBalance10: any;
  public subTypeBalance11: any;
  public subTypeBalance12: any;
  public listBalance: any;
  public listBalance2: any;
  public listBalance3: any;
  public listBalance4: any;
  public listBalance5: any;
  public listBalance6: any;
  public listBalance7: any;
  public listBalance8: any;
  public listBalance9: any;
  public listBalance10: any;
  public listBalance11: any;
  public listBalance12: any;

  constructor(
    private balanceSheetService: BalanceSheetService,
    private toastr: ToastrService
  ) {
    this.colBalance = [];
    this.listBalance = {};
    this.subSectionBalance = [];
    this.typeBalance = [];
    this.subTypeBalance1 = [];
    this.subTypeBalance2 = [];
    this.colBalanceSection = [
      { activos: 'Activos', pasivos: 'Pasivos', capitalContable: 'Capital Contable', value: 'Total de Activos',
        cost: '$ 281,120.00', value2: 'Total de Pasivos', cost2: '$ 191,066.00', value3: 'Total de Capital Contable',
        cost3: '$ 90,054.00', value4: 'Total de Pasivos y Capital Contable', cost4: '$ 281,120.00' },
      {subId: 1, activoCorriente: 'Activos Corrientes', activoNoCorriente: 'Activos No Corrientes',
       inversiones: 'Inversiones', activosTangibles: 'Activos Tangibles', activosIntangibles: 'Activos Intangibles',
       gastosDiferidos: 'Gastos Diferidos', pasivosCorrientes: 'Pasivos Corrientes', pasivosLargoP: 'Pasivos a Largo Plazo',
       capitalSocial: 'Capital Social', excedenteCap: 'Excedente de Capital', ingresosRetenidos: 'Ingresos Retenidos(Deficit Acumulado)',
       ajusteCapital: 'Ajuste de Capital', type: [
         {typeId: 1, activoCirculante: 'Activo Circulante', inventarios: 'Inventarios',
          subType1: [
            {field: 'activoCirculante', header: 'Activo Circulante'},
            {field: 'cajaBankos', header: 'Caja y Bancos'},
            {field: 'segNegociable', header: 'Seguridad Negociable'},
            {field: 'customer', header: 'Clientes'},
            {field: 'provision', header: 'Provision Para Insolvencia '},
            {field: 'docuemnts', header: 'Documentos Por Cobrar A Corto Plazo'},
            {field: 'insolvencia', header: 'Provisión Para Insolvencia '},
            {field: 'debitos', header: 'Debitos Por Impuestos Diferidos'},
            {field: 'gastos', header: 'Gastos de prepago'},
            {field: 'cuentas', header: 'Cuentas incobrables'},
            {field: 'iva', header: 'IVA Acreditable No Pagado'},
            {field: 'contribuciones', header: 'Contribuciones a Favor  (Favor IVA e ISR)'},
            {field: 'anticipo', header: 'Anticipo de Impuestos '}
          ],
          subType2: [
            {field: 'mercancias', header: 'Mercancías'},
            {field: 'products', header: 'Productos Terminados'},
            {field: 'Bienes', header: 'Bienes Semi Terminados'},
            {field: 'workProcess', header: 'Trabajo en Proceso'},
            {field: 'materiaPrima', header: 'Materias Primas'},
            {field: 'suministro', header: 'Suministros'},
          ],
          subType3: [
            {field: 'mercancias', header: 'Mercancías'},
            {field: 'products', header: 'Productos Terminados'},
            {field: 'Bienes', header: 'Bienes Semi Terminados'},
            {field: 'workProcess', header: 'Trabajo en Proceso'},
            {field: 'materiaPrima', header: 'Materias Primas'},
            {field: 'suministro', header: 'Suministros'},
          ],
          subType4: [
            {field: 'depositosLL', header: 'Depósitos bancarios a largo plazo'},
            {field: 'depostiosRest', header: 'Depósitos y depósitos bancarios restringidos'},
            {field: 'valoresInv', header: 'Valores de inversión'},
            {field: 'prestamosLL', header: 'Préstamos a largo plazo'},
            {field: 'provDeudInc', header: 'Provisión para deudas incobrables'},
            {field: 'accreedoresLL', header: 'Acreedores a largo plazo'},
            {field: 'cuentaDesc', header: 'Cuenta de descuento de valor actual'},
            {field: 'propInv', header: 'Propiedades de inversión'},
            {field: 'depoGaranty', header: 'Deposito en garantia'},
            {field: 'invTemporales', header: 'Inversiones Temporales'},

          ],
          subType5: [
            {field: 'actTemp', header: 'Activos Temporales'},
            {field: 'terrenos', header: 'Terrenos'},
            {field: 'edificios', header: 'Edificios'},
            {field: 'depreciacion', header: 'Depreciacion Acumulada'},
            {field: 'estructuras', header: 'Estructuras'},
            {field: 'depreAcum', header: 'Depreciacion Acumulada'},
            {field: 'maquinaria', header: 'Maquinaria'},
            {field: 'mobiliario', header: 'Mobiliario y Equipo de oficina'},
            {field: 'vehiculos', header: 'Vehiculos y Equipo de Transporte'},
            {field: 'processInv', header: 'Inversiones en Proceso'},

          ],
          subType6: [
            {field: 'co', header: 'Costos de Organización'},
            {field: 'cp', header: 'Costos Preoperativos'},
            {field: 'cni', header: 'Costos de Nuevos inventarios'},
            {field: 'ceo', header: 'Costos de emision Obligacion'},
            {field: 'gid', header: 'Gastos de Investigacion y Desarrollo'},

          ],
          subType7: [
            {field: 'ccoo', header: 'Costos de Organización'},
            {field: 'ccpp', header: 'Costos Preoperativos'},
            {field: 'ccnnp', header: 'Costos de Nuevos inventarios'},
            {field: 'cceeoo', header: 'Costos de emision Obligacion'},
            {field: 'gido', header: 'Gastos de Investigacion y Desarrollo'},

          ],
          subType8: [
            {field: 'tpp', header: 'Trato Pagable a Proveedores'},
            {field: 'pcp', header: 'Prestamos a Corto Plazo'},
            {field: 'ad', header: 'Acreedores Diversos'},
            {field: 'ipr', header: 'Impuestos por pagar (Retenciones , IVA , ISR)'},
            {field: 'dpp', header: 'Dividiendos Pagables'},
            {field: 'pdll', header: 'Parte actual de las deudas a largo plazo'},
            {field: 'dpiva', header: 'Disposiciones sobre pasivos (Pagar IVA)'},
            {field: 'ivatc', header: 'IVA Trasladado No Cobrado'},
            {field: 'docpp', header: 'Documentos Por Pagar'},

          ],
          subType9: [
            {field: 'prePag', header: 'Prestamos por pagares'},
            {field: 'prell', header: 'Prestamos a Largo Plazo'},
            {field: 'trall', header: 'Transacción de pago a largo plazo'},
            {field: 'cdesV', header: 'Cuenta de descuento de valor actual'},
            {field: 'ProPas', header: 'Provisiones de Pasivos'},

          ],
          subType10: [
            {field: 'capdesemb', header: 'Capital desembolsado por encima del valor nominal'},
            {field: 'gananciareduccion', header: 'Ganancia en reducción de capital'},
            {field: 'gananciaComb', header: 'Ganancia por combinación de negocios'},
            {field: 'otros', header: 'Otros excedentes de capital'},

          ],
          subType11: [
            {field: 'reservaL', header: 'Reserva Legal'},
            {field: 'reservaR', header: 'Reserva para la racionalización de negocios'},
            {field: 'resservaM', header: 'Resserva de Mejoras en la Estructura Financiera'},
            {field: 'gananciasR', header: 'Ganancias retenidas no asignadas transferidas al año siguiente'},
            {field: 'contribucioness', header: 'Contribuciones / Aportaciones por futuros aumentos'},
          ],
          subType12: [
            {field: 'emissionAcc', header: 'Emisión de acciones con descuento'},
            {field: 'dividendos', header: 'Dividendos preoperativos'},
            {field: 'accionesP', header: 'Acciones Propias'},
            {field: 'cdConversion', header: 'Considerar para derechos de conversión'},
            {field: 'cgAcciones', header: 'Considere para las garantías de acciones'},
            {field: 'divAccionesEmit', header: 'Dividendos en acciones sin emitir'},
            {field: 'gananciaValoracion', header: 'Ganancia en la valoración de la inversión en valores de renta variable'},
            {field: 'creditTranslateMon', header: 'Crédito de traducción en moneda extranjera'},
            {field: 'creditTranslateOp', header: 'Crédito de traducción de operaciones en el extranjero'},

          ],
         }
        ]
      }
    ];
  }

  ngOnInit(): void {
    this.getBalanceSheet();
    this.colBalance = [
      {field: 'korean', header: 'Korean'},
      {field: 'categori', header: 'Categoría'},
      {field: 'english', header: 'English'},
      {field: 'spanish', header: 'Español'},
      {field: 'currentDate', header: 'Current Year'},
    ];

    const subSectionBalance = this.colBalanceSection.filter(item => item.subId === 1);
    const typeBalance = subSectionBalance[0].type.filter(item => item);
    const subTypeBalance1 = typeBalance[0].subType1;
    const subTypeBalance2 = typeBalance[0].subType2;
    const subTypeBalance3 = typeBalance[0].subType3;
    const subTypeBalance4 = typeBalance[0].subType4;
    const subTypeBalance5 = typeBalance[0].subType5;
    const subTypeBalance6 = typeBalance[0].subType6;
    const subTypeBalance7 = typeBalance[0].subType7;
    const subTypeBalance8 = typeBalance[0].subType8;
    const subTypeBalance9 = typeBalance[0].subType9;
    const subTypeBalance10 = typeBalance[0].subType10;
    const subTypeBalance11 = typeBalance[0].subType11;
    const subTypeBalance12 = typeBalance[0].subType12;

    this.subSectionBalance = subSectionBalance;
    this.typeBalance = typeBalance;
    this.subTypeBalance1 = subTypeBalance1;
    this.subTypeBalance2 = subTypeBalance2;
    this.subTypeBalance3 = subTypeBalance3;
    this.subTypeBalance4 = subTypeBalance4;
    this.subTypeBalance5 = subTypeBalance5;
    this.subTypeBalance6 = subTypeBalance6;
    this.subTypeBalance7 = subTypeBalance7;
    this.subTypeBalance8 = subTypeBalance8;
    this.subTypeBalance9 = subTypeBalance9;
    this.subTypeBalance10 = subTypeBalance10;
    this.subTypeBalance11 = subTypeBalance11;
    this.subTypeBalance12 = subTypeBalance12;
    this.listBalance = [
        {field: 'activoCorriente', header: '$69,924,880'},
        {field: 'cajaBankos', header: '$17,109,596'},
        {field: 'segNegociable', header: '$0.00'},
        {field: 'customer', header: '$34,897,835'},
        {field: 'provision', header: '$0.00'},
        {field: 'docuemnts', header: '$6,500,000'},
        {field: 'insolvencia', header: '$0.00'},
        {field: 'debitos', header: '$0.00'},
        {field: 'gastos', header: '$0.00'},
        {field: 'cuentas', header: '$0.00'},
        {field: 'iva', header: '$0.00'},
        {field: 'contribuciones', header: '1,832,124'},
        {field: 'anticipo', header: '8,385,962'}
      ];
    this.listBalance2 = [
      {field: 'mercancias', header: '$0.00'},
      {field: 'products', header: '$0.00'},
      {field: 'Bienes', header: '$0.00'},
      {field: 'workProcess', header: '$0.00'},
      {field: 'materiaPrima', header: '$0.00'},
      {field: 'suministro', header: '$0.00'}
    ];

    this.listBalance3 = [
      {field: 'mercancias', header: '$0.00'},
      {field: 'products', header: '$0.00'},
      {field: 'Bienes', header: '$0.00'},
      {field: 'workProcess', header: '$0.00'},
      {field: 'materiaPrima', header: '$0.00'},
      {field: 'suministro', header: '$0.00'},
    ];
    this.listBalance4 = [
      {field: 'depositosLL', header: '$0.00'},
      {field: 'depostiosRest', header: '$0.00'},
      {field: 'valoresInv', header: '$0.00'},
      {field: 'prestamosLL', header: '$0.00'},
      {field: 'provDeudInc', header: '$0.00'},
      {field: 'accreedoresLL', header: '$0.00'},
      {field: 'cuentaDesc', header: '$0.00'},
      {field: 'propInv', header: '$0.00'},
      {field: 'depoGaranty', header: '$0.00'},
      {field: 'invTemporales', header: '$0.00'},
    ];
    this.listBalance5 = [
      {field: 'actTemp', header: '$0.00'},
      {field: 'terrenos', header: '$0.00'},
      {field: 'edificios', header: '$0.00'},
      {field: 'depreciacion', header: '$0.00'},
      {field: 'estructuras', header: '$0.00'},
      {field: 'depreAcum', header: '$0.00'},
      {field: 'maquinaria', header: '$0.00'},
      {field: 'mobiliario', header: '$0.00'},
      {field: 'vehiculos', header: '$0.00'},
      {field: 'processInv', header: '$0.00'},
    ];
    this.listBalance6 = [
      {field: 'co', header: '$000'},
      {field: 'cp', header: '$000'},
      {field: 'cni', header: '$000'},
      {field: 'ceo', header: '$000'},
      {field: 'gid', header: '$000'},
    ];
    this.listBalance7 = [
      {field: 'ccoo', header: '$0.00'},
      {field: 'ccpp', header: '$0.00'},
      {field: 'ccnnp', header: '$0.00'},
      {field: 'cceeoo', header: '$0.00'},
      {field: 'gido', header: '$0.00'},
    ];
    this.listBalance8 = [
      {field: 'tpp', header: '$0.00'},
      {field: 'pcp', header: '$0.00'},
      {field: 'ad', header: '$0.00'},
      {field: 'ipr', header: '$0.00'},
      {field: 'dpp', header: '$0.00'},
      {field: 'pdll', header: '$0.00'},
      {field: 'dpiva', header: '$0.00'},
      {field: 'ivatc', header: '$0.00'},
      {field: 'docpp', header: '$0.00'},
    ];
    this.listBalance9 = [
      {field: 'prePag', header: '$0.00'},
      {field: 'prell', header: '$0.00'},
      {field: 'trall', header: '$0.00'},
      {field: 'cdesV', header: '$0.00'},
      {field: 'ProPas', header: '$0.00'},
    ];
    this.listBalance10 = [
      {field: 'capdesemb', header: '$0.00'},
      {field: 'gananciareduccion', header: '$0.00'},
      {field: 'gananciaComb', header: '$0.00'},
      {field: 'otros', header: '$0.00'},
    ];
    this.listBalance11 = [
      {field: 'reservaL', header: '$000'},
      {field: 'reservaR', header: '$000'},
      {field: 'resservaM', header: '$000'},
      {field: 'gananciasR', header: '$000'},
      {field: 'contribucioness', header: '$000'},
    ];
    this.listBalance12 = [
      {field: 'emissionAcc', header: '$0.00'},
      {field: 'dividendos', header: '$0.00'},
      {field: 'accionesP', header: '$0.00'},
      {field: 'cdConversion', header: '$0.00'},
      {field: 'cgAcciones', header: '$0.00'},
      {field: 'divAccionesEmit', header: '$0.00'},
      {field: 'gananciaValoracion', header: '$0.00'},
      {field: 'creditTranslateMon', header: '$0.00'},
      {field: 'creditTranslateOp', header: '$0.00'},
    ];
  }

  getBalanceSheet(): void {
    const currentYear = 2020; // moment.(new Date).year();
    this.balanceSheetService.getAccountings(currentYear).subscribe(
      data => {
      this.listActivBalance = data;
    });
  }

}
