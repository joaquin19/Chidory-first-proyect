import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBanksFormComponent } from './accounts-banks-form.component';

describe('AccountsBanksFormComponent', () => {
  let component: AccountsBanksFormComponent;
  let fixture: ComponentFixture<AccountsBanksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsBanksFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsBanksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
