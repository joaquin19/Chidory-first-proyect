import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Action } from '@app/shared/enums';

@Component({
  selector: 'app-customers-contact-form',
  templateUrl: './customers-contact-form.component.html',
  styleUrls: ['./customers-contact-form.component.scss']
})
export class CustomersContactFormComponent implements OnInit {

  @ViewChild('formCustomerContact', { static: false })
  public formCustomerContact: NgForm;

  public action: Action;
  public item: any;
  public dataReceived: any;
  public customerContact: any;
  public submitted: boolean;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.dataReceived = {};
    this.customerContact = {};
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
        this.customerContact = {
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
        this.customerContact = {
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

    if (this.formCustomerContact.invalid) {
      return;
    }
    this.customerContact.firstName = this.customerContact.firstName !== null ? this.customerContact.firstName.trim() : '';
    this.customerContact.lastName = this.customerContact.lastName !== null ? this.customerContact.lastName.trim() : '';
    this.customerContact.fullName = `${this.customerContact.firstName.trim()} ${this.customerContact.lastName.trim()}`;

    this.closeForm(this.customerContact);
  }

  closeForm(resp): void {
    this.ref.close(resp);
  }

}
