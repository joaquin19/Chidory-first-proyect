import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';

import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { Action, CustomerType } from '@app/shared/enums';
import {
  CityService, CountryService, CustomerContactService, CustomerDocumentTypeService,
  CustomerFinancialService, CustomerLegalRepresentativeService, CustomerPaymentTermService,
  CustomerRecordDocumentService, CustomerRecordService, CustomerService, CustomerTypeService,
  PlantService, StateProvinceService
} from '../../../services';
import { CustomersContactFormComponent } from '../customers-contact-form/customers-contact-form.component';
import { CustomersFinancialFormComponent } from '../customers-financial-form/customers-financial-form.component';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss']
})
export class CustomersFormComponent implements OnInit {

  @ViewChild('formCustomer', { static: false })
  public formCustomer: NgForm

  public ref: DynamicDialogRef;
  public activeState: boolean[];
  public submitted: boolean;
  public customer: any;
  public customerLegalRepresentative: any;
  public listCustomerFinancials: any;
  public headersCustomerFinancials: any;
  public customerRecord: any;
  public listCustomerContacts: any;
  public headersCustomerContacts: any;
  public listCustomerType: any;
  public listCountries: any;
  public listStatesProvinces: any;
  public listCities: any;
  public listPlants: any;
  public listCustomerPaymentTerm: any;
  public listCustomerDocumentType: any;
  public fiscalSituationDocument: any;
  public accountStatusDocument: any;

  public pageRedirect: string;
  public typesFiles: string;
  public files: any;
  public fileIdentification: any;
  public actionForm: Action;
  public actionModal: any;
  public currentUser: any;
  public exportCustomerType = CustomerType.Exportacion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerTypeService: CustomerTypeService,
    private countryService: CountryService,
    private stateProvinceService: StateProvinceService,
    private cityService: CityService,
    private plantService: PlantService,
    private customerService: CustomerService,
    private customerLegalRepresentativeService: CustomerLegalRepresentativeService,
    private customerFinancialService: CustomerFinancialService,
    private customerRecordService: CustomerRecordService,
    private customerRecordDocumentService: CustomerRecordDocumentService,
    private customerContactService: CustomerContactService,
    private customerPaymentTermService: CustomerPaymentTermService,
    private customerDocumentTypeService: CustomerDocumentTypeService,
    public dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.initObjects();

    this.activeState = [true, false, false, false, false];
    this.submitted = false;

    this.listCustomerType = [];
    this.listCountries = [];
    this.listStatesProvinces = [];
    this.listCities = [];
    this.listPlants = [];
    this.listCustomerPaymentTerm = [];
    this.listCustomerDocumentType = [];

    this.pageRedirect = '/dashboard/catalogs/customers';
    this.typesFiles = '.pdf';
    this.files = [];
    this.fileIdentification = [];
    this.actionForm = Action.None;
    this.actionModal = Action;
  }

  initObjects() {
    this.customer = {
      id: 0,
      customerTypeId: null,
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

    this.customerLegalRepresentative = {
      id: 0,
      firstName: '',
      lastName: '',
      curpId: '',
      rfcId: '',
      email: '',
      userName: '',
      systemName: '',
      path: ''
    };

    this.listCustomerFinancials = [];

    this.customerRecord = {
      id: 0,
      plantId: null,
      customerPaymentTermId: null,
      notes: '',
      fiscalSituationId: 0,
      fiscalSituation: '',
      accountStatusId: 0,
      accountStatus: '',
      customerRecordDocuments: []
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

    this.listCustomerContacts = [];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;

    this.headersCustomerFinancials = [
      { field: 'account', header: 'No. Cuenta', width: 'col-w lg' },
      { field: 'clabe', header: 'Clabe', width: 'col-w lg' },
      { field: 'bankName', header: 'Banco', width: 'col-w lg' },
      { field: 'currencyName', header: 'Moneda', width: 'col-w lg' },
      { field: 'swift', header: 'Swift', width: 'col-w lg' },
      { field: 'contactName', header: 'Contacto', width: 'col-w xl' },
      { field: 'email', header: 'Email', width: 'col-w xl' },
      { field: 'phone', header: 'Teléfono', width: 'col-w md' }
    ];

    this.headersCustomerContacts = [
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
          case 'addCustomer':
            this.actionForm = Action.Create;
            break;
          case 'editCustomer':
            this.actionForm = Action.Edit;
            this.getCustomerById(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]).then();
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]).then();
      }
    });

    this.getCustomerTypes();
    this.getCountries();
    this.getPlants();
    this.getCustomerPaymentTerms();
    this.getCustomerDocumentTypes();
  }

  getCustomerTypes() {
    this.customerTypeService.getCustomerTypes().subscribe(
      data => {
        this.listCustomerType = data;
      });
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      data => {
        this.listCountries = data;
        if (this.actionForm === Action.Edit) {
          this.changeCountry({ value: this.customer.countryId });
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
        if (this.actionForm === Action.Edit) {
          this.changeStatesProvinces({ value: this.customer.stateProvinceId });
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

  getCustomerPaymentTerms() {
    this.customerPaymentTermService.getCustomerPaymentTerms().subscribe(
      data => {
        this.listCustomerPaymentTerm = data;
      });
  }

  getCustomerDocumentTypes() {
    this.customerDocumentTypeService.getCustomerDocumentTypes().subscribe(
      data => {
        this.listCustomerDocumentType = data;

        this.listCustomerDocumentType.forEach(element => {
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

  getCustomerById(customerId) {
    this.customerService.getCustomerById(customerId).subscribe(
      data => {
        this.customer = data;
        this.getCustomerLegalRepresentativeByCustomerId(this.customer.id);
        this.getCustomerFinancialsByCustomerId(this.customer.id);
        this.getCustomerRecordByCustomerId(this.customer.id);
        this.getCustomerContactsByCustomerId(this.customer.id);
      });
  }

  getCustomerLegalRepresentativeByCustomerId(customerId) {
    this.customerLegalRepresentativeService.getCustomerLegalRepresentativeByCustomerId(customerId).subscribe(
      data => {
        this.customerLegalRepresentative = data != null ? data : this.customerLegalRepresentative;
        this.customerLegalRepresentative.firstName =
          this.customerLegalRepresentative.firstName != null ? this.customerLegalRepresentative.firstName : '';
        this.customerLegalRepresentative.lastName =
          this.customerLegalRepresentative.lastName != null ? this.customerLegalRepresentative.lastName : '';
        this.customerLegalRepresentative.curpId =
          this.customerLegalRepresentative.curpId != null ? this.customerLegalRepresentative.curpId : '';
        this.customerLegalRepresentative.rfcId =
          this.customerLegalRepresentative.rfcId != null ? this.customerLegalRepresentative.rfcId : '';
        this.customerLegalRepresentative.email =
          this.customerLegalRepresentative.email != null ? this.customerLegalRepresentative.email : '';
        this.customerLegalRepresentative.officialIdentification =
          this.customerLegalRepresentative.documentUserName != null ? this.customerLegalRepresentative.documentUserName : '';
      });
  }

  getCustomerFinancialsByCustomerId(customerId) {
    this.customerFinancialService.getCustomerFinancialsByCustomerId(customerId).subscribe(
      data => {
        this.listCustomerFinancials = data;
      });
  }

  getCustomerRecordByCustomerId(customerId) {
    this.customerRecordService.getCustomerRecordByCustomerId(customerId).subscribe(
      data => {
        this.customerRecord = data;
        this.customerRecord.notes = this.customerRecord.notes !== null ? this.customerRecord.notes : '';
        this.getCustomerRecordDocumentsByRecordId(this.customerRecord.id);
      });
  }

  getCustomerRecordDocumentsByRecordId(recordId) {
    this.customerRecordDocumentService.getCustomerRecordDocumentsByRecordId(recordId).subscribe(
      data => {
        this.customerRecord.customerRecordDocuments = data;
        data.forEach(item => {
          const customerDocumentType = this.listCustomerDocumentType.filter(o => o.id === item.customerDocumentTypeId)[0];
          switch (customerDocumentType.name) {
            case 'Constancia de situación fiscal':
              this.customerRecord.fiscalSituation = item.userName;
              break;
            case 'Estado de cuenta':
              this.customerRecord.accountStatus = item.userName;
              break;
          }
        });
      });
  }

  getCustomerContactsByCustomerId(customerValue) {
    this.customerContactService.getCustomerContactsByCustomerId(customerValue).subscribe(
      data => {
        this.listCustomerContacts = data;
      });
  }

  officialIdentificationSelect(event) {
    const file = event.currentFiles[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    this.customerLegalRepresentative.officialIdentification = fileName;

    const fileItem = { file };
    this.fileIdentification.push(fileItem);
  }

  officialIdentificationRemove(event) {
    this.fileIdentification = this.fileIdentification.filter(o => o.name !== event.file.name);
  }

  fiscalSituationSelect(customerDocumentTypeId, event) {
    const file = event.currentFiles[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    this.customer.accountStatus = '';
    this.files = this.files.filter(o => o.customerDocumentTypeId !== customerDocumentTypeId);

    this.customerRecord.fiscalSituationId = parseInt(customerDocumentTypeId, 0);
    this.customerRecord.fiscalSituation = fileName;
    const fileItem = { customerDocumentTypeId, file };
    this.files.push(fileItem);
  }

  fiscalSituationRemove(event) {
    this.files = this.files.filter(o => o.name !== event.file.name);
  }

  accountStatusSelect(customerDocumentTypeId, event) {
    const file = event.currentFiles[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    this.customer.accountStatus = '';
    this.files = this.files.filter(o => o.customerDocumentTypeId !== customerDocumentTypeId);

    this.customerRecord.accountStatusId = parseInt(customerDocumentTypeId, 0);
    this.customerRecord.accountStatus = fileName;
    const fileItem = { customerDocumentTypeId, file };
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

  openModalCustomerContacts(action: Action, item: any, index: number) {
    let titleModal: string = '';

    switch (action) {
      case Action.Create:
        titleModal = 'Nuevo';
        break;
      case Action.Edit:
        titleModal = 'Editar';
        break;
    }

    this.ref = this.dialogService.open(CustomersContactFormComponent, {
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
        if (this.listCustomerContacts.some(o => o.id === result.id && o.firstName === result.firstName
          && o.lastName === result.lastName && o.phone1 === result.phone1 && o.phone2 === result.phone2
          && o.movil1 === result.movil1 && o.movil2 === result.movil2 && o.email === result.email)) {
          this.toastr.warning(`El contacto ya existe.`);
        } else {
          switch (action) {
            case Action.Create:
              this.listCustomerContacts.push(result);
              this.toastr.success(`Contacto agregado correctamente`);
              break;
            case Action.Edit:
              this.listCustomerContacts[index] = result;
              this.toastr.success(`Contacto editado correctamente`);
              break;
          }
        }
      }
    });
  }

  openModalCustomerFinancials(action: Action, item: any, index: number) {
    let titleModal: string = '';

    switch (action) {
      case Action.Create:
        titleModal = 'Nueva';
        break;
      case Action.Edit:
        titleModal = 'Editar';
        break;
    }

    this.ref = this.dialogService.open(CustomersFinancialFormComponent, {
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
        if (this.listCustomerFinancials.some(o => o.id === result.id && o.account === result.account
          && o.clabe === result.clabe && o.bankId === result.bankId && o.bankName === result.bankName
          && o.currencyId === result.currencyId && o.currencyName === result.currencyName && o.swift === result.swift
          && o.contactName === result.contactName && o.email === result.email && o.phone === result.phone)) {
          this.toastr.warning(`La Información Financiera ya existe.`);
        } else {
          switch (action) {
            case Action.Create:
              this.listCustomerFinancials.push(result);
              this.toastr.success(`Información Financiera agregado correctamente`);
              break;
            case Action.Edit:
              this.listCustomerFinancials[index] = result;
              this.toastr.success(`Información Financiera editada correctamente`);
              break;
          }
        }
      }
    });
  }

  saveForm() {
    this.submitted = true;

    if (this.formCustomer.invalid) {
      this.toggleAll(true);
      return;
    }

    const customerSave: any = {};

    const formData = new FormData();

    // Supplier Main
    customerSave.id = this.customer.id;
    customerSave.customerTypeId = this.customer.customerTypeId;
    customerSave.countryId = this.customer.countryId;
    customerSave.stateProvinceId = this.customer.stateProvinceId;
    customerSave.cityId = this.customer.cityId;
    customerSave.name = this.customer.name != null ? this.customer.name.trim() : null;
    customerSave.rfcId = this.customer.rfcId != null ? this.customer.rfcId.trim() : null;
    customerSave.legalName = this.customer.legalName != null ? this.customer.legalName.trim() : null;
    customerSave.street = this.customer.street != null ? this.customer.street.trim() : null;
    customerSave.neighborhoodName = this.customer.neighborhoodName != null ? this.customer.neighborhoodName.trim() : null;
    customerSave.zipCode = this.customer.zipCode != null ? this.customer.zipCode : null;
    customerSave.websiteUrl = '';
    customerSave.taxId = this.customer.taxId;
    customerSave.fax = this.customer.fax;

    // Legal Representative
    customerSave.customerLegalRepresentative = {};

    if ((this.customerLegalRepresentative.fullName !== null) || (this.customerLegalRepresentative.fullName === null)) {
      this.customerLegalRepresentative.fullName = '';
      customerSave.customerLegalRepresentative = this.customerLegalRepresentative;
    }

    this.fileIdentification.forEach(item => {
      formData.append('fileIdentification', item.file, item.file.name);
    });

    // Financial
    const customerFinancialArray = [];
    this.listCustomerFinancials.forEach(item => {
      customerFinancialArray.push({
        id: item.id,
        account: isNaN(item.account) ? 0 : parseInt(item.account, 0),
        clabe: isNaN(item.clabe) ? 0 : parseInt(item.clabe, 0),
        bankId: item.bankId,
        currencyId: item.currencyId,
        swift: (item.swift != null) ? item.swift.trim() : null,
        contactName: item.contactName.trim(),
        email: item.email,
        phone: item.phone
      });
    });
    customerSave.customerFinancials = customerFinancialArray;

    // Record
    customerSave.customerRecord = this.customerRecord;

    if (this.files.length !== 0) {
      this.files.forEach(item => {
        customerSave.customerRecord.customerRecordDocuments.push({
          id: item.id !== undefined ? item.id : 0,
          customerDocumentTypeId: parseInt(item.customerDocumentTypeId, 0),
          userName: item.file.name,
          systemName: item.systemName !== undefined ? item.systemName : '',
          path: item.path !== undefined ? item.path : ''
        });
      });
    }

    // Contacts
    const customerContactArray = [];
    this.listCustomerContacts.forEach(item => {
      customerContactArray.push({
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
    customerSave.customerContacts = customerContactArray;

    customerSave.createBy = this.currentUser.userName;

    this.files.forEach(item => {
      formData.append('files', item.file, item.file.name);
    });

    formData.append('customerSave', JSON.stringify(customerSave));

    switch (this.actionForm) {
      case Action.Create:
        this.customerService.saveCustomer(formData).subscribe(data => {
          this.toastr.success(`Cliente guardado correctamente.`);
          this.router.navigate([this.pageRedirect]).then();
        }, error => {
          this.toastr.error(error.message);
        });
        break;
      case Action.Edit:
        this.customerService.updateCustomer(formData).subscribe(data => {
          this.toastr.success(`Cliente editado correctamente.`);
          this.router.navigate([this.pageRedirect]).then();
        }, error => {
          this.toastr.error(error.message);
        });
        break;
    }
  }

}
