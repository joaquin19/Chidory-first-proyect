import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingListDetailFormComponent } from './packing-list-detail-form.component';

describe('PackingListDetailFormComponent', () => {
  let component: PackingListDetailFormComponent;
  let fixture: ComponentFixture<PackingListDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingListDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingListDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
