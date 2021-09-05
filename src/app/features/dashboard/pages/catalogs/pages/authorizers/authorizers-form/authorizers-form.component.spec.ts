import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizersFormComponent } from './authorizers-form.component';

describe('AuthorizersFormComponent', () => {
  let component: AuthorizersFormComponent;
  let fixture: ComponentFixture<AuthorizersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
