import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationEditionFormComponent } from './reconciliation-edition-form.component';

describe('ReconciliationEditionFormComponent', () => {
  let component: ReconciliationEditionFormComponent;
  let fixture: ComponentFixture<ReconciliationEditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationEditionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
