import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationListComponent } from './reconciliation-list.component';

describe('ReconciliationListComponent', () => {
  let component: ReconciliationListComponent;
  let fixture: ComponentFixture<ReconciliationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
