import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizersOrderFormComponent } from './authorizers-order-form.component';

describe('AuthorizersOrderFormComponent', () => {
  let component: AuthorizersOrderFormComponent;
  let fixture: ComponentFixture<AuthorizersOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizersOrderFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizersOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
