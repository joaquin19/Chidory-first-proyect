import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersFinancialFormComponent } from './suppliers-financial-form.component';

describe('SuppliersFinancialFormComponent', () => {
  let component: SuppliersFinancialFormComponent;
  let fixture: ComponentFixture<SuppliersFinancialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersFinancialFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersFinancialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
