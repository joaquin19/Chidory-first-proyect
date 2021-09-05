import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Action } from '@app/shared/enums';

@Component({
  selector: 'app-suppliers-contact-form',
  templateUrl: './suppliers-contact-form.component.html',
  styleUrls: ['./suppliers-contact-form.component.scss']
})
export class SuppliersContactFormComponent implements OnInit {

  @ViewChild('formSupplierContact', { static: false })
  public formSupplierContact: NgForm;

  public action: Action;
  public item: any;
  public dataReceived: any;
  public supplierContact: any;
  public submitted: boolean;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.dataReceived = {};
    this.supplierContact = {};
    this.submitted = false;
  }

  ngOnInit(): void {
    this.showForm();
  }

  showForm() {
    this.dataReceived = this.config.data;
    this.action = this.dataReceived.action;
    this.item = this.dataReceived.item;

    switch (this.action) {
      case Action.Create:
        this.supplierContact = {
          id: 0,
          firstName: '',
          lastName: '',
          fullName: '',
          phone1: null,
          phone2: null,
          movil1: null,
          movil2: null,
          email: ''
        };
        break;
      case Action.Edit:
        this.supplierContact = {
          id: this.item.id,
          firstName: this.item.firstName,
          lastName: this.item.lastName,
          fullName: this.item.fullName,
          phone1: this.item.phone1,
          phone2: this.item.phone2,
          movil1: this.item.movil1,
          movil2: this.item.movil2,
          email: this.item.email
        };
        break;
    }
  }

  saveForm() {
    this.submitted = true;

    if (this.formSupplierContact.invalid) {
      return;
    }
    this.supplierContact.firstName = this.supplierContact.firstName !== null ? this.supplierContact.firstName.trim() : '';
    this.supplierContact.lastName = this.supplierContact.lastName !== null ? this.supplierContact.lastName.trim() : '';
    this.supplierContact.fullName = `${this.supplierContact.firstName.trim()} ${this.supplierContact.lastName.trim()}`;

    this.closeForm(this.supplierContact);
  }

  closeForm(resp): void {
    this.ref.close(resp);
  }

}
