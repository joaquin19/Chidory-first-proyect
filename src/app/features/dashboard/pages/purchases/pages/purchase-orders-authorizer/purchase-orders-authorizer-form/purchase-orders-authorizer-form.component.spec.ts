import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersAuthorizerFormComponent } from './purchase-orders-authorizer-form.component';

describe('PurchaseOrdersAuthorizerFormComponent', () => {
  let component: PurchaseOrdersAuthorizerFormComponent;
  let fixture: ComponentFixture<PurchaseOrdersAuthorizerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersAuthorizerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersAuthorizerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
