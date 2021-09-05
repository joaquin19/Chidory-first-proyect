import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersDetailModalComponent } from './purchase-orders-detail-modal.component';

describe('PurchaseOrdersDetailModalComponent', () => {
  let component: PurchaseOrdersDetailModalComponent;
  let fixture: ComponentFixture<PurchaseOrdersDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
