import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingListListComponent } from './packing-list-list.component';

describe('PackingListListComponent', () => {
  let component: PackingListListComponent;
  let fixture: ComponentFixture<PackingListListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingListListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
