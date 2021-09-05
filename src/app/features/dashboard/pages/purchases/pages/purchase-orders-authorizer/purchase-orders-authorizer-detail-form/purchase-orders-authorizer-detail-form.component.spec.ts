import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersAuthorizerDetailFormComponent } from './purchase-orders-authorizer-detail-form.component';

describe('PurchaseOrdersAuthorizerDetailFormComponent', () => {
  let component: PurchaseOrdersAuthorizerDetailFormComponent;
  let fixture: ComponentFixture<PurchaseOrdersAuthorizerDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersAuthorizerDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersAuthorizerDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
