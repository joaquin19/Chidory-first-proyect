import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBanksDetailComponent } from './accounts-banks-detail.component';

describe('AccountsBanksDetailComponent', () => {
  let component: AccountsBanksDetailComponent;
  let fixture: ComponentFixture<AccountsBanksDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsBanksDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsBanksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
