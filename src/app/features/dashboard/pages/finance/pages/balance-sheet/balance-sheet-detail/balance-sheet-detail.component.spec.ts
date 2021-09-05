import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetDetailComponent } from './balance-sheet-detail.component';

describe('BalanceSheetDetailComponent', () => {
  let component: BalanceSheetDetailComponent;
  let fixture: ComponentFixture<BalanceSheetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceSheetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
