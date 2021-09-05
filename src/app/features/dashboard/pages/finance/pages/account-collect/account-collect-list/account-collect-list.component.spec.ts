import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCollectListComponent } from './account-collect-list.component';

describe('AccountCollectListComponent', () => {
  let component: AccountCollectListComponent;
  let fixture: ComponentFixture<AccountCollectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCollectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCollectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
