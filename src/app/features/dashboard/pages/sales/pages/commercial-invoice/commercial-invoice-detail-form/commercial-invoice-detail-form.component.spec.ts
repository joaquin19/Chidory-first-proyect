import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialInvoiceDetailFormComponent } from './commercial-invoice-detail-form.component';

describe('CommercialInvoiceDetailFormComponent', () => {
  let component: CommercialInvoiceDetailFormComponent;
  let fixture: ComponentFixture<CommercialInvoiceDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialInvoiceDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialInvoiceDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
