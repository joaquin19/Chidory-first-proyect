import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceMovementsComponent } from './balance-movements.component';

describe('BalanceMovementsComponent', () => {
  let component: BalanceMovementsComponent;
  let fixture: ComponentFixture<BalanceMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceMovementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
