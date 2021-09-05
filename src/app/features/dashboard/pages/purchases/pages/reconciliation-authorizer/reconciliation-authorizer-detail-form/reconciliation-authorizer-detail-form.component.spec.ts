import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationAuthorizerDetailFormComponent } from './reconciliation-authorizer-detail-form.component';

describe('ReconciliationAuthorizerDetailFormComponent', () => {
  let component: ReconciliationAuthorizerDetailFormComponent;
  let fixture: ComponentFixture<ReconciliationAuthorizerDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationAuthorizerDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationAuthorizerDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
