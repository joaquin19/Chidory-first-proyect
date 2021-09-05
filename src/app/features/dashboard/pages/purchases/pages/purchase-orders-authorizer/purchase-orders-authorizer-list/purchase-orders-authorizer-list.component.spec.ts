import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersAuthorizerListComponent } from './purchase-orders-authorizer-list.component';

describe('PurchaseOrdersAuthorizerListComponent', () => {
  let component: PurchaseOrdersAuthorizerListComponent;
  let fixture: ComponentFixture<PurchaseOrdersAuthorizerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersAuthorizerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersAuthorizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
