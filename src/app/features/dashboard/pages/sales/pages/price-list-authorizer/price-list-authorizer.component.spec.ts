import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListAuthorizerComponent } from './price-list-authorizer.component';

describe('PriceListAuthorizerComponent', () => {
  let component: PriceListAuthorizerComponent;
  let fixture: ComponentFixture<PriceListAuthorizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListAuthorizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListAuthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
