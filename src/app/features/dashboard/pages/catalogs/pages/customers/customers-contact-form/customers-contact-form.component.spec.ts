import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersContactFormComponent } from './customers-contact-form.component';

describe('CustomersContactFormComponent', () => {
  let component: CustomersContactFormComponent;
  let fixture: ComponentFixture<CustomersContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
