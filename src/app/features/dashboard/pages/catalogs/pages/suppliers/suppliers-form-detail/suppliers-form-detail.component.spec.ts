import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersFormDetailComponent } from './suppliers-form-detail.component';

describe('SuppliersFormDetailComponent', () => {
  let component: SuppliersFormDetailComponent;
  let fixture: ComponentFixture<SuppliersFormDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersFormDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
