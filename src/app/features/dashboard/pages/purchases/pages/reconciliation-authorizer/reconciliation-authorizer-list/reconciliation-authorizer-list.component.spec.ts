import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationAuthorizerListComponent } from './reconciliation-authorizer-list.component';

describe('ReconciliationAuthorizerListComponent', () => {
  let component: ReconciliationAuthorizerListComponent;
  let fixture: ComponentFixture<ReconciliationAuthorizerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationAuthorizerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationAuthorizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
