import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseReceptionFormComponent } from './merchandise-reception-form.component';

describe('MerchandiseReceptionFormComponent', () => {
  let component: MerchandiseReceptionFormComponent;
  let fixture: ComponentFixture<MerchandiseReceptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandiseReceptionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseReceptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
