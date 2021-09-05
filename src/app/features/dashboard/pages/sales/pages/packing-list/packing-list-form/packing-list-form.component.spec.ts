import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingListFormComponent } from './packing-list-form.component';

describe('PackingListFormComponent', () => {
  let component: PackingListFormComponent;
  let fixture: ComponentFixture<PackingListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingListFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
