import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPayableListComponent } from './account-payable-list.component';

describe('AccountPayableListComponent', () => {
  let component: AccountPayableListComponent;
  let fixture: ComponentFixture<AccountPayableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPayableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPayableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
