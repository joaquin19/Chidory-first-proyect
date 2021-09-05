import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCollectDetailComponent } from './account-collect-detail.component';

describe('AccountCollectDetailComponent', () => {
  let component: AccountCollectDetailComponent;
  let fixture: ComponentFixture<AccountCollectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCollectDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCollectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
