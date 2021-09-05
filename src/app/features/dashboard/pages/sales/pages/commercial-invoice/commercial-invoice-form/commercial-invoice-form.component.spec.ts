import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialInvoiceFormComponent } from './commercial-invoice-form.component';

describe('CommercialInvoiceFormComponent', () => {
  let component: CommercialInvoiceFormComponent;
  let fixture: ComponentFixture<CommercialInvoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialInvoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
