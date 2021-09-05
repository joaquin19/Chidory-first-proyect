import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizersListComponent } from './authorizers-list.component';

describe('AuthorizersListComponent', () => {
  let component: AuthorizersListComponent;
  let fixture: ComponentFixture<AuthorizersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
