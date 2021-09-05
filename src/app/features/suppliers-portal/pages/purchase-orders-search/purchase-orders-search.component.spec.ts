import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersSearchComponent } from './purchase-orders-search.component';

describe('PurchaseOrdersSearchComponent', () => {
  let component: PurchaseOrdersSearchComponent;
  let fixture: ComponentFixture<PurchaseOrdersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
