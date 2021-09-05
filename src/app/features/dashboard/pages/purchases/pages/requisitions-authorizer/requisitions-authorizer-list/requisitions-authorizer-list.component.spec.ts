import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsAuthorizerListComponent } from './requisitions-authorizer-list.component';

describe('RequisitionsAuthorizerListComponent', () => {
  let component: RequisitionsAuthorizerListComponent;
  let fixture: ComponentFixture<RequisitionsAuthorizerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionsAuthorizerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsAuthorizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
