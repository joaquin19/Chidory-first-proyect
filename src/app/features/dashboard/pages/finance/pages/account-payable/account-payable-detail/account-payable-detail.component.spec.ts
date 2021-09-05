import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPayableDetailComponent } from './account-payable-detail.component';

describe('AccountPayableDetailComponent', () => {
  let component: AccountPayableDetailComponent;
  let fixture: ComponentFixture<AccountPayableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPayableDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPayableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
