import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersContactFormComponent } from './suppliers-contact-form.component';

describe('SuppliersContactFormComponent', () => {
  let component: SuppliersContactFormComponent;
  let fixture: ComponentFixture<SuppliersContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
