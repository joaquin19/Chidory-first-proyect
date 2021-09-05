import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListAuthorizerListComponent } from './price-list-authorizer-list.component';

describe('PriceListAuthorizerListComponent', () => {
  let component: PriceListAuthorizerListComponent;
  let fixture: ComponentFixture<PriceListAuthorizerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListAuthorizerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListAuthorizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
