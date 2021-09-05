import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSupportFormComponent } from './sales-support-form.component';

describe('SalesSupportFormComponent', () => {
  let component: SalesSupportFormComponent;
  let fixture: ComponentFixture<SalesSupportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesSupportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSupportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
