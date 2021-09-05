import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseReceptionComponent } from './merchandise-reception.component';

describe('MerchandiseReceptionComponent', () => {
  let component: MerchandiseReceptionComponent;
  let fixture: ComponentFixture<MerchandiseReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandiseReceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
