import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersFinancialFormComponent } from './customers-financial-form.component';

describe('CustomersFinancialFormComponent', () => {
  let component: CustomersFinancialFormComponent;
  let fixture: ComponentFixture<CustomersFinancialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersFinancialFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersFinancialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
