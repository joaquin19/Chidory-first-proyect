import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListAuthorizerDetailFormComponent } from './price-list-authorizer-detail-form.component';

describe('PriceListAuthorizerDetailFormComponent', () => {
  let component: PriceListAuthorizerDetailFormComponent;
  let fixture: ComponentFixture<PriceListAuthorizerDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListAuthorizerDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListAuthorizerDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
