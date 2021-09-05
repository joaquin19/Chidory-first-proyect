import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersArticleModalComponent } from './purchase-orders-article-modal.component';

describe('PurchaseOrdersArticleModalComponent', () => {
  let component: PurchaseOrdersArticleModalComponent;
  let fixture: ComponentFixture<PurchaseOrdersArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersArticleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
