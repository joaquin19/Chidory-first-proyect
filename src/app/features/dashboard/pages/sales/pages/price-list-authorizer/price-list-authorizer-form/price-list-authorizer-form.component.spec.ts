import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListAuthorizerFormComponent } from './price-list-authorizer-form.component';

describe('PriceListAuthorizerFormComponent', () => {
  let component: PriceListAuthorizerFormComponent;
  let fixture: ComponentFixture<PriceListAuthorizerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListAuthorizerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListAuthorizerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
