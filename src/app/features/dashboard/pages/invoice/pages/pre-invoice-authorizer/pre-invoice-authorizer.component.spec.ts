import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInvoiceAuthorizerComponent } from './pre-invoice-authorizer.component';

describe('PreInvoiceAuthorizerComponent', () => {
  let component: PreInvoiceAuthorizerComponent;
  let fixture: ComponentFixture<PreInvoiceAuthorizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInvoiceAuthorizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInvoiceAuthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
