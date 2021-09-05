import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizersComponent } from './authorizers.component';

describe('AuthorizersComponent', () => {
  let component: AuthorizersComponent;
  let fixture: ComponentFixture<AuthorizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
