import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseReceptionDetailModalComponent } from './merchandise-reception-detail-modal.component';

describe('MerchandiseReceptionDetailModalComponent', () => {
  let component: MerchandiseReceptionDetailModalComponent;
  let fixture: ComponentFixture<MerchandiseReceptionDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandiseReceptionDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseReceptionDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
