import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationDetailFormComponent } from './reconciliation-detail-form.component';

describe('ReconciliationDetailFormComponent', () => {
  let component: ReconciliationDetailFormComponent;
  let fixture: ComponentFixture<ReconciliationDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
