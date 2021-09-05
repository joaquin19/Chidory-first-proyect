import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInvoiceAuthorizerListComponent } from './pre-invoice-authorizer-list.component';

describe('PreInvoiceAuthorizerListComponent', () => {
  let component: PreInvoiceAuthorizerListComponent;
  let fixture: ComponentFixture<PreInvoiceAuthorizerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInvoiceAuthorizerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInvoiceAuthorizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
