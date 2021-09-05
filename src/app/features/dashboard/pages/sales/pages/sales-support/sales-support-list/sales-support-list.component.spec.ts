import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSupportListComponent } from './sales-support-list.component';

describe('SalesSupportListComponent', () => {
  let component: SalesSupportListComponent;
  let fixture: ComponentFixture<SalesSupportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesSupportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSupportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
