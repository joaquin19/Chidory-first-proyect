import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsListComponent } from './requisitions-list.component';

describe('RequisitionsListComponent', () => {
  let component: RequisitionsListComponent;
  let fixture: ComponentFixture<RequisitionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
