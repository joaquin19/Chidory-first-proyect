import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsDetailFormComponent } from './requisitions-detail-form.component';

describe('RequisitionsDetailFormComponent', () => {
  let component: RequisitionsDetailFormComponent;
  let fixture: ComponentFixture<RequisitionsDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionsDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
