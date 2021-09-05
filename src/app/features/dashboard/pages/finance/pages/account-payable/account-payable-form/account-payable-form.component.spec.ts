import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPayableFormComponent } from './account-payable-form.component';

describe('AccountPayableFormComponent', () => {
  let component: AccountPayableFormComponent;
  let fixture: ComponentFixture<AccountPayableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPayableFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPayableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
