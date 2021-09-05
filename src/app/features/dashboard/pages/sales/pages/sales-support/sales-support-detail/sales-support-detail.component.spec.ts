import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSupportDetailComponent } from './sales-support-detail.component';

describe('SalesSupportDetailComponent', () => {
  let component: SalesSupportDetailComponent;
  let fixture: ComponentFixture<SalesSupportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesSupportDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSupportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
