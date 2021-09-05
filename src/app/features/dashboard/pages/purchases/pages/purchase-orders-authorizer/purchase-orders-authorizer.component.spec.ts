import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersAuthorizerComponent } from './purchase-orders-authorizer.component';

describe('PurchaseOrdersAuthorizerComponent', () => {
  let component: PurchaseOrdersAuthorizerComponent;
  let fixture: ComponentFixture<PurchaseOrdersAuthorizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersAuthorizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersAuthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
