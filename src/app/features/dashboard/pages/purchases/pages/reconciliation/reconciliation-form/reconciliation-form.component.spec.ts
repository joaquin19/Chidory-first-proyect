import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationFormComponent } from './reconciliation-form.component';

describe('ReconciliationFormComponent', () => {
  let component: ReconciliationFormComponent;
  let fixture: ComponentFixture<ReconciliationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
