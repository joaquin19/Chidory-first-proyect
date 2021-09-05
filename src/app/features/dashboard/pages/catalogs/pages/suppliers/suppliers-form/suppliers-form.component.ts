import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action } from '@app/shared/enums';
import {
  CityService, CountryService, SupplierContactService, SupplierDocumentTypeService,
  SupplierFinancialService, SupplierLegalRepresentativeService, SupplierPaymentTermService,
  SupplierRecordDocumentService, SupplierRecordService, SupplierService, SupplierTypeService,
  PlantService, StateProvinceService
} from '../../../services';
import { SuppliersContactFormComponent } from '../suppliers-contact-form/suppliers-contact-form.component';
import { SuppliersFinancialFormComponent } from '../suppliers-financial-form/suppliers-financial-form.component';

@Component({
  selector: 'app-suppliers-form',
  templateUrl: './suppliers-form.component.html',
  styleUrls: ['./suppliers-form.component.scss']
})
export class SuppliersFormComponent implements OnInit {

  @ViewChild('formSupplier', { static: false })
  public formSupplier: NgForm

  public ref: DynamicDialogRef;
  public activeState: boolean[];
  public submitted: boolean;
  public supplier: any;
  public supplierLegalRepresentative: any;
  public listSupplierFinancials: any;
  public headersSupplierFinancials: any;
  public supplierRecord: any;
  public listSupplierContacts: any;
  public headersSupplierContacts: any;
  public listSupplierType: any;
  public listCountries: any;
  public listStatesProvinces: any;
  public listCities: any;
  public listPlants: any;
  public listSupplierPaymentTerm: any;
  public listSupplierDocumentType: any;
  public fiscalSituationDocument: any;
  public accountStatusDocument: any;

  public pageRedirect: string;
  public typesFiles: string;
  public files: any;
  public actionForm: Action;
  public actionModal: any;
  public currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierTypeService: SupplierTypeService,
    private countryService: CountryService,
    private stateProvinceService: StateProvinceService,
    private cityService: CityService,
    private plantService: PlantService,
    private supplierService: SupplierService,
    private supplierLegalRepresentativeService: SupplierLegalRepresentativeService,
    private supplierFinancialService: SupplierFinancialService,
    private supplierRecordService: SupplierRecordService,
    private supplierRecordDocumentService: SupplierRecordDocumentService,
    private supplierContactService: SupplierContactService,
    private supplierPaymentTermService: SupplierPaymentTermService,
    private supplierDocumentTypeService: SupplierDocumentTypeService,
    public dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.initObjects();

    this.activeState = [true, false, false, false, false];
    this.submitted = false;

    this.listSupplierType = [];
    this.listCountries = [];
    this.listStatesProvinces = [];
    this.listCities = [];
    this.listPlants = [];
    this.listSupplierPaymentTerm = [];
    this.listSupplierDocumentType = [];

    this.pageRedirect = '/dashboard/catalogs/suppliers';
    this.typesFiles = '.pdf';
    this.files = [];
    this.actionForm = Action.None;
    this.actionModal = Action;
  }

  initObjects() {
    this.supplier = {
      id: 0,
      supplierTypeId: null,
      countryId: null,
      stateProvinceId: null,
      cityId: null,
      name: '',
      rfcId: '',
      legalName: '',
      street: '',
      neighborhoodName: '',
      zipCode: null,
      websiteUrl: ''
    };

    this.supplierLegalRepresentative = {
      id: 0,
      firstName: '',
      lastName: '',
      curpId: '',
      rfcId: '',
      email: ''
    };

    this.listSupplierFinancials = [];

    this.supplierRecord = {
      id: 0,
      plantId: null,
      supplierPaymentTermId: null,
      notes: '',
      fiscalSituationId: 0,
      fiscalSituation: '',
      accountStatusId: 0,
      accountStatus: '',
      supplierRecordDocuments: []
    };

    this.fiscalSituationDocument = {
      id: 0,
      name: '',
      description: '',
      required: false,
      accountStatus: ''
    };

    this.accountStatusDocument = {
      id: 0,
      name: '',
      description: '',
      required: false,
      allowedExtensions: ''
    };

    this.listSupplierContacts = [];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headersSupplierFinancials = [
      { field: 'account', header: 'No. Cuenta', width: 'col-w lg' },
      { field: 'clabe', header: 'Clabe', width: 'col-w lg' },
      { field: 'bankName', header: 'Banco', width: 'col-w lg' },
      { field: 'currencyName', header: 'Moneda', width: 'col-w lg' }
    ];

    this.headersSupplierContacts = [
      { field: 'fullName', header: 'Nombre', width: 'col-w xxl' },
      { field: 'phone1', header: 'Teléfono 1', width: 'col-w md' },
      { field: 'phone2', header: 'Teléfono 2', width: 'col-w md' },
      { field: 'movil1', header: 'Celular 1', width: 'col-w md' },
      { field: 'movil2', header: 'Celular 2', width: 'col-w md' },
      { field: 'email', header: 'Email', width: 'col-w xxl' }
    ];

    this.showForm();
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addSupplier':
            this.actionForm = Action.Create;
            break;
          case 'editSupplier':
            this.actionForm = Action.Edit;
            this.getSupplierById(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]).then();
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]).then();
      }
    });

    this.getSupplierTypes();
    this.getCountries();
    this.getPlants();
    this.getSupplierPaymentTerms();
    this.getSupplierDocumentTypes();
  }

  getSupplierTypes() {
    this.supplierTypeService.getSupplierTypes().subscribe(
      data => {
        this.listSupplierType = data;
      });
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      data => {
        this.listCountries = data;
        if (this.actionForm = Action.Edit) {
          this.changeCountry({ value: this.supplier.countryId });
        }
      });
  }

  changeCountry(event) {
    this.listStatesProvinces = [];
    this.listCities = [];
    const countryValue = event.value;
    if (countryValue !== null) {
      this.getStatesProvinces(countryValue);
    }
  }

  getStatesProvinces(countryId) {
    this.stateProvinceService.getStatesProvinces(countryId).subscribe(
      data => {
        this.listStatesProvinces = data;
        if (this.actionForm = Action.Edit) {
          this.changeStatesProvinces({ value: this.supplier.stateProvinceId });
        }
      });
  }

  changeStatesProvinces(event) {
    this.listCities = [];
    const stateValue = event.value;
    if (stateValue !== null) {
      this.getCities(stateValue);
    }
  }

  getCities(stateId) {
    this.cityService.getCities(stateId).subscribe(
      data => {
        this.listCities = data;
      });
  }

  getPlants() {
    this.plantService.getPlants().subscribe(
      data => {
        this.listPlants = data;
      });
  }

  getSupplierPaymentTerms() {
    this.supplierPaymentTermService.getSupplierPaymentTerms().subscribe(
      data => {
        this.listSupplierPaymentTerm = data;
      });
  }

  getSupplierDocumentTypes() {
    this.supplierDocumentTypeService.getSupplierDocumentTypes().subscribe(
      data => {
        this.listSupplierDocumentType = data;

        this.listSupplierDocumentType.forEach(element => {
          switch (element.name) {
            case 'Constancia de situación fiscal':
              this.fiscalSituationDocument.id = element.id;
              this.fiscalSituationDocument.name = element.name;
              this.fiscalSituationDocument.description = element.description;
              this.fiscalSituationDocument.required = element.required;
              this.fiscalSituationDocument.allowedExtensions = element.allowedExtensions;
              break;
            case 'Estado de cuenta':
              this.accountStatusDocument.id = element.id;
              this.accountStatusDocument.name = element.name;
              this.accountStatusDocument.description = element.description;
              this.accountStatusDocument.required = element.required;
              this.accountStatusDocument.allowedExtensions = element.allowedExtensions;
              break;
          }
        });
      });
  }

  getSupplierById(supplierId) {
    this.supplierService.getSupplierById(supplierId).subscribe(
      data => {
        this.supplier = data;
        this.getSupplierLegalRepresentativeBySupplierId(this.supplier.id);
        this.getSupplierFinancialsBySupplierId(this.supplier.id);
        this.getSupplierRecordBySupplierId(this.supplier.id);
        this.getSupplierContactsBySupplierId(this.supplier.id);
      });
  }

  getSupplierLegalRepresentativeBySupplierId(supplierId) {
    this.supplierLegalRepresentativeService.getSupplierLegalRepresentativeBySupplierId(supplierId).subscribe(
      data => {
        this.supplierLegalRepresentative = data != null ? data : this.supplierLegalRepresentative;
        this.supplierLegalRepresentative.firstName =
          this.supplierLegalRepresentative.firstName != null ? this.supplierLegalRepresentative.firstName : '';
        this.supplierLegalRepresentative.lastName =
          this.supplierLegalRepresentative.lastName != null ? this.supplierLegalRepresentative.lastName : '';
        this.supplierLegalRepresentative.curpId =
          this.supplierLegalRepresentative.curpId != null ? this.supplierLegalRepresentative.curpId : '';
        this.supplierLegalRepresentative.rfcId =
          this.supplierLegalRepresentative.rfcId != null ? this.supplierLegalRepresentative.rfcId : '';
        this.supplierLegalRepresentative.email =
          this.supplierLegalRepresentative.email != null ? this.supplierLegalRepresentative.email : '';
        this.supplierLegalRepresentative.officialIdentification =
          this.supplierLegalRepresentative.documentUserName != null ? this.supplierLegalRepresentative.documentUserName : '';
      });
  }

  getSupplierFinancialsBySupplierId(supplierId) {
    this.supplierFinancialService.getSupplierFinancialsBySupplierId(supplierId).subscribe(
      data => {
        this.listSupplierFinancials = data;
      });
  }

  getSupplierRecordBySupplierId(supplierId) {
    this.supplierRecordService.getSupplierRecordBySupplierId(supplierId).subscribe(
      data => {
        this.supplierRecord = data;
        this.supplierRecord.notes = this.supplierRecord.notes !== null ? this.supplierRecord.notes : '';
        this.getSupplierRecordDocumentsByRecordId(this.supplierRecord.id);
      });
  }

  getSupplierRecordDocumentsByRecordId(recordId) {
    this.supplierRecordDocumentService.getSupplierRecordDocumentsByRecordId(recordId).subscribe(
      data => {
        this.supplierRecord.SupplierRecordDocuments = data;
        data.forEach(item => {
          const SupplierDocumentType = this.listSupplierDocumentType.filter(o => o.id === item.supplierDocumentTypeId)[0];
          switch (SupplierDocumentType.name) {
            case 'Constancia de situación fiscal':
              this.supplierRecord.fiscalSituation = item.userName;
              break;
            case 'Estado de cuenta':
              this.supplierRecord.accountStatus = item.userName;
              break;
          }
        });
      });
  }

  getSupplierContactsBySupplierId(supplierId) {
    this.supplierContactService.getSupplierContactsBySupplierId(supplierId).subscribe(
      data => {
        this.listSupplierContacts = data;
      });
  }

  fiscalSituationSelect(supplierDocumentTypeId, event) {
    const file = event.currentFiles[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    this.supplier.accountStatus = '';
    this.files = this.files.filter(o => o.SupplierDocumentTypeId !== supplierDocumentTypeId);

    this.supplierRecord.fiscalSituationId = parseInt(supplierDocumentTypeId, 0);
    this.supplierRecord.fiscalSituation = fileName;
    const fileItem = { supplierDocumentTypeId, file };
    this.files.push(fileItem);
  }

  fiscalSituationRemove(event) {
    this.files = this.files.filter(o => o.name !== event.file.name);
  }

  accountStatusSelect(supplierDocumentTypeId, event) {
    const file = event.currentFiles[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    this.supplier.accountStatus = '';
    this.files = this.files.filter(o => o.supplierDocumentTypeId !== supplierDocumentTypeId);

    this.supplierRecord.accountStatusId = parseInt(supplierDocumentTypeId, 0);
    this.supplierRecord.accountStatus = fileName;
    const fileItem = { supplierDocumentTypeId, file };
    this.files.push(fileItem);
  }

  accountStatusRemove(event) {
    this.files = this.files.filter(o => o.name !== event.file.name);
  }

  toggleAll(value: boolean) {
    for (const key in this.activeState) {
      if (Object.prototype.hasOwnProperty.call(this.activeState, key)) {
        this.activeState[key] = value;
      }
    }
  }

  openModalSupplierContacts(action: Action, item: any, index: number) {
    let titleModal: string = '';

    switch (action) {
      case Action.Create:
        titleModal = 'Nuevo';
        break;
      case Action.Edit:
        titleModal = 'Editar';
        break;
    }

    this.ref = this.dialogService.open(SuppliersContactFormComponent, {
      data: { action, item },
      header: `${titleModal} Contacto`,
      width: '70%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (result !== undefined) {
        if (this.listSupplierContacts.some(o => o.id === result.id && o.firstName === result.firstName
          && o.lastName === result.lastName && o.phone1 === result.phone1 && o.phone2 === result.phone2
          && o.movil1 === result.movil1 && o.movil2 === result.movil2 && o.email === result.email)) {
          this.toastr.warning(`El contacto ya existe.`);
        } else {
          switch (action) {
            case Action.Create:
              this.listSupplierContacts.push(result);
              this.toastr.success(`Contacto agregado correctamente`);
              break;
            case Action.Edit:
              this.listSupplierContacts[index] = result;
              this.toastr.success(`Contacto editado correctamente`);
              break;
          }
        }
      }
    });
  }

  openModalSupplierFinancials(action: Action, item: any, index: number) {
    let titleModal: string = '';

    switch (action) {
      case Action.Create:
        titleModal = 'Nueva';
        break;
      case Action.Edit:
        titleModal = 'Editar';
        break;
    }

    this.ref = this.dialogService.open(SuppliersFinancialFormComponent, {
      data: { action, item },
      header: `${titleModal} Información Financiera`,
      width: '70%',
      closeOnEscape: false,
      contentStyle: {
        [`max-height`]: '680px',
        [`overflow`]: 'auto'
      }
    });

    this.ref.onClose.subscribe((result) => {
      if (result !== undefined) {
        if (this.listSupplierFinancials.some(o => o.id === result.id && o.account === result.account
          && o.clabe === result.clabe && o.bankId === result.bankId && o.bankName === result.bankName
          && o.currencyId === result.currencyId && o.currencyName === result.currencyName && o.swift === result.swift
          && o.contactName === result.contactName && o.email === result.email && o.phone === result.phone)) {
          this.toastr.warning(`La Información Financiera ya existe.`);
        } else {
          switch (action) {
            case Action.Create:
              this.listSupplierFinancials.push(result);
              this.toastr.success(`Información Financiera agregado correctamente`);
              break;
            case Action.Edit:
              this.listSupplierFinancials[index] = result;
              this.toastr.success(`Información Financiera editada correctamente`);
              break;
          }
        }
      }
    });
  }

  saveForm() {
    this.submitted = true;

    if (this.formSupplier.invalid) {
      this.toggleAll(true);
      return;
    }

    const supplierSave: any = {};

    const formData = new FormData();

    // Supplier Main
    supplierSave.id = this.supplier.id;
    supplierSave.supplierTypeId = this.supplier.supplierTypeId;
    supplierSave.countryId = this.supplier.countryId;
    supplierSave.stateProvinceId = this.supplier.stateProvinceId;
    supplierSave.cityId = this.supplier.cityId;
    supplierSave.name = this.supplier.name != null ? this.supplier.name.trim() : null;
    supplierSave.rfcId = this.supplier.rfcId != null ? this.supplier.rfcId.trim() : null;
    supplierSave.legalName = this.supplier.legalName != null ? this.supplier.legalName.trim() : null;
    supplierSave.street = this.supplier.street != null ? this.supplier.street.trim() : null;
    supplierSave.neighborhoodName = this.supplier.neighborhoodName != null ? this.supplier.neighborhoodName.trim() : null;
    supplierSave.zipCode = this.supplier.zipCode != null ? this.supplier.zipCode : null;
    supplierSave.websiteUrl = '';

    // Legal Representative
    supplierSave.supplierLegalRepresentative = {};

    if ((this.supplierLegalRepresentative.fullName !== null) || (this.supplierLegalRepresentative.fullName === null)) {
      this.supplierLegalRepresentative.fullName = '';
      supplierSave.SupplierLegalRepresentative = this.supplierLegalRepresentative;
    }

    // Financial
    const supplierFinancialArray = [];
    this.listSupplierFinancials.forEach(item => {
      supplierFinancialArray.push({
        id: item.id,
        account: isNaN(item.account) ? 0 : parseInt(item.account, 0),
        clabe: isNaN(item.clabe) ? 0 : parseInt(item.clabe, 0),
        bankId: item.bankId,
        currencyId: item.currencyId
      });
    });
    supplierSave.supplierFinancials = supplierFinancialArray;

    // Record
    supplierSave.supplierRecord = this.supplierRecord;

    if (this.files.length !== 0) {
      this.files.forEach(item => {
        supplierSave.supplierRecord.supplierRecordDocuments.push({
          id: item.id !== undefined ? item.id : 0,
          SupplierDocumentTypeId: parseInt(item.SupplierDocumentTypeId, 0),
          userName: item.file.name,
          systemName: item.systemName !== undefined ? item.systemName : '',
          path: item.path !== undefined ? item.path : ''
        });
      });
    }

    // Contacts
    const supplierContactArray = [];
    this.listSupplierContacts.forEach(item => {
      supplierContactArray.push({
        id: item.id,
        firstName: item.firstName != null ? item.firstName.trim() : null,
        lastName: item.lastName != null ? item.lastName.trim() : null,
        phone1: item.phone1 != null ? item.phone1 : null,
        phone2: item.phone2 != null ? item.phone2 : null,
        movil1: item.movil1 != null ? item.movil1 : null,
        movil2: item.movil2 != null ? item.movil2 : null,
        email: item.email != null ? item.email.trim() : null,
      });
    });
    supplierSave.supplierContacts = supplierContactArray;

    supplierSave.createBy = this.currentUser.userName;

    this.files.forEach(item => {
      formData.append('files', item.file, item.file.name);
    });

    formData.append('supplierSave', JSON.stringify(supplierSave));

    switch (this.actionForm) {
      case Action.Create:
        this.supplierService.saveSupplier(formData).subscribe(data => {
          this.toastr.success(`Proveedor guardado correctamente.`);
          this.router.navigate([this.pageRedirect]).then();
        }, error => {
          this.toastr.error(error.message);
        });
        break;
      case Action.Edit:
        this.supplierService.updateSupplier(formData).subscribe(data => {
          this.toastr.success(`Proveedor editado correctamente.`);
          this.router.navigate([this.pageRedirect]).then();
        }, error => {
          this.toastr.error(error.message);
        });
        break;
    }
  }

}
