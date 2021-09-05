import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBanksListComponent } from './accounts-banks-list.component';

describe('AccountsBanksListComponent', () => {
  let component: AccountsBanksListComponent;
  let fixture: ComponentFixture<AccountsBanksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsBanksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsBanksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
