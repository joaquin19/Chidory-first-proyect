import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationAuthorizerFormComponent } from './reconciliation-authorizer-form.component';

describe('ReconciliationAuthorizerFormComponent', () => {
  let component: ReconciliationAuthorizerFormComponent;
  let fixture: ComponentFixture<ReconciliationAuthorizerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationAuthorizerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationAuthorizerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
