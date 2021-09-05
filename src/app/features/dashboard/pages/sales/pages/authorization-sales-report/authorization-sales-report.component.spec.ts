import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationSalesReportComponent } from './authorization-sales-report.component';

describe('AuthorizationSalesReportComponent', () => {
  let component: AuthorizationSalesReportComponent;
  let fixture: ComponentFixture<AuthorizationSalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationSalesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
