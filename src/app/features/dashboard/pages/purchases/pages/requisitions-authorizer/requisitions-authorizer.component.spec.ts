import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsAuthorizerComponent } from './requisitions-authorizer.component';

describe('RequisitionsAuthorizerComponent', () => {
  let component: RequisitionsAuthorizerComponent;
  let fixture: ComponentFixture<RequisitionsAuthorizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionsAuthorizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsAuthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
