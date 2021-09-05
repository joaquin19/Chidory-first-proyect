import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialInvoiceListComponent } from './commercial-invoice-list.component';

describe('CommercialInvoiceListComponent', () => {
  let component: CommercialInvoiceListComponent;
  let fixture: ComponentFixture<CommercialInvoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialInvoiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
