import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationSalesReportListComponent } from './authorization-sales-report-list.component';

describe('AuthorizationSalesReportListComponent', () => {
  let component: AuthorizationSalesReportListComponent;
  let fixture: ComponentFixture<AuthorizationSalesReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationSalesReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationSalesReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
