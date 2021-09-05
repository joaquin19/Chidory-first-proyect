import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCollectFormComponent } from './account-collect-form.component';

describe('AccountCollectFormComponent', () => {
  let component: AccountCollectFormComponent;
  let fixture: ComponentFixture<AccountCollectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCollectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCollectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
