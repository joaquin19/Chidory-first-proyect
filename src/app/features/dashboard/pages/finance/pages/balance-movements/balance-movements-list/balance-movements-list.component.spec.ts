import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceMovementsListComponent } from './balance-movements-list.component';

describe('BalanceMovementsListComponent', () => {
  let component: BalanceMovementsListComponent;
  let fixture: ComponentFixture<BalanceMovementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceMovementsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceMovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
