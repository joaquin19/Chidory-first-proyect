import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceMovementsFormComponent } from './balance-movements-form.component';

describe('BalanceMovementsFormComponent', () => {
  let component: BalanceMovementsFormComponent;
  let fixture: ComponentFixture<BalanceMovementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceMovementsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceMovementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
