import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInvoiceDetailComponent } from './pre-invoice-detail.component';

describe('PreInvoiceDetailComponent', () => {
  let component: PreInvoiceDetailComponent;
  let fixture: ComponentFixture<PreInvoiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInvoiceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
