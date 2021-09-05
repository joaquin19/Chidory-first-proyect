import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsAuthorizerDetailFormComponent } from './requisitions-authorizer-detail-form.component';

describe('RequisitionsAuthorizerDetailFormComponent', () => {
  let component: RequisitionsAuthorizerDetailFormComponent;
  let fixture: ComponentFixture<RequisitionsAuthorizerDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionsAuthorizerDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsAuthorizerDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
