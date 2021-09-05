import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationSalesReportDetailComponent } from './authorization-sales-report-detail.component';

describe('AuthorizationSalesReportDetailComponent', () => {
  let component: AuthorizationSalesReportDetailComponent;
  let fixture: ComponentFixture<AuthorizationSalesReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationSalesReportDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationSalesReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
