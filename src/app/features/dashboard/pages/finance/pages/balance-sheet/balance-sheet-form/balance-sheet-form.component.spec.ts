import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetFormComponent } from './balance-sheet-form.component';

describe('BalanceSheetFormComponent', () => {
  let component: BalanceSheetFormComponent;
  let fixture: ComponentFixture<BalanceSheetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceSheetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
