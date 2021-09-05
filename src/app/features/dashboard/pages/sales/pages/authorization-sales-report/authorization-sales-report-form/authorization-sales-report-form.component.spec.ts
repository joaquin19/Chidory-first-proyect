import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationSalesReportFormComponent } from './authorization-sales-report-form.component';

describe('AuthorizationSalesReportFormComponent', () => {
  let component: AuthorizationSalesReportFormComponent;
  let fixture: ComponentFixture<AuthorizationSalesReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationSalesReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationSalesReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
