import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsFormComponent } from './requisitions-form.component';

describe('RequisitionsFormComponent', () => {
  let component: RequisitionsFormComponent;
  let fixture: ComponentFixture<RequisitionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
