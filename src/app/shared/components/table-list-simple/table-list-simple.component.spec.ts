import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListSimpleComponent } from './table-list-simple.component';

describe('TableListSimpleComponent', () => {
  let component: TableListSimpleComponent;
  let fixture: ComponentFixture<TableListSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
