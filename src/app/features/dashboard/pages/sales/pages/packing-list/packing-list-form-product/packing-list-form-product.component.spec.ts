import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingListFormProductComponent } from './packing-list-form-product.component';

describe('PackingListFormProductComponent', () => {
  let component: PackingListFormProductComponent;
  let fixture: ComponentFixture<PackingListFormProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingListFormProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingListFormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
