import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExportFormComponent } from './product-export-form.component';

describe('ProductExportFormComponent', () => {
  let component: ProductExportFormComponent;
  let fixture: ComponentFixture<ProductExportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductExportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductExportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
