import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInvoiceAuthorizerDetailFormComponent } from './pre-invoice-authorizer-detail-form.component';

describe('PreInvoiceAuthorizerDetailFormComponent', () => {
  let component: PreInvoiceAuthorizerDetailFormComponent;
  let fixture: ComponentFixture<PreInvoiceAuthorizerDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInvoiceAuthorizerDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInvoiceAuthorizerDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
