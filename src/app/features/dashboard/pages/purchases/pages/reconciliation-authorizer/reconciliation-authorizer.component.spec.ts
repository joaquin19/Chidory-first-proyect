import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationAuthorizerComponent } from './reconciliation-authorizer.component';

describe('ReconciliationAuthorizerComponent', () => {
  let component: ReconciliationAuthorizerComponent;
  let fixture: ComponentFixture<ReconciliationAuthorizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationAuthorizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationAuthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
