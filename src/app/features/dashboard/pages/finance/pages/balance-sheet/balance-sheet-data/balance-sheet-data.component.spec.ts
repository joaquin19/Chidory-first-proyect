import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetDataComponent } from './balance-sheet-data.component';

describe('BalanceSheetDataComponent', () => {
  let component: BalanceSheetDataComponent;
  let fixture: ComponentFixture<BalanceSheetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceSheetDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSheetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
