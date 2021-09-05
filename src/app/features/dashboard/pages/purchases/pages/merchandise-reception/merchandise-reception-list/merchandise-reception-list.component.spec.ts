import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseReceptionListComponent } from './merchandise-reception-list.component';

describe('MerchandiseReceptionListComponent', () => {
  let component: MerchandiseReceptionListComponent;
  let fixture: ComponentFixture<MerchandiseReceptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandiseReceptionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseReceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
