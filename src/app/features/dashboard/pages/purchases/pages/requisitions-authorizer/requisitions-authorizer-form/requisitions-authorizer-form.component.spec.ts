import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsAuthorizerFormComponent } from './requisitions-authorizer-form.component';

describe('RequisitionsAuthorizerFormComponent', () => {
  let component: RequisitionsAuthorizerFormComponent;
  let fixture: ComponentFixture<RequisitionsAuthorizerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionsAuthorizerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsAuthorizerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
