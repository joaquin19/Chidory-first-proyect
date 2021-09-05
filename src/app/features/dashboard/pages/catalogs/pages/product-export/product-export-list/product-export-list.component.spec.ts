import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExportListComponent } from './product-export-list.component';

describe('ProductExportListComponent', () => {
  let component: ProductExportListComponent;
  let fixture: ComponentFixture<ProductExportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductExportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductExportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
