import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersFormDetailComponent } from './customers-form-detail.component';

describe('CustomersFormDetailComponent', () => {
  let component: CustomersFormDetailComponent;
  let fixture: ComponentFixture<CustomersFormDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersFormDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
