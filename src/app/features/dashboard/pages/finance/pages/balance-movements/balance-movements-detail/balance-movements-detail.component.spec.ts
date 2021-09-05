import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceMovementsDetailComponent } from './balance-movements-detail.component';

describe('BalanceMovementsDetailComponent', () => {
  let component: BalanceMovementsDetailComponent;
  let fixture: ComponentFixture<BalanceMovementsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceMovementsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceMovementsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
