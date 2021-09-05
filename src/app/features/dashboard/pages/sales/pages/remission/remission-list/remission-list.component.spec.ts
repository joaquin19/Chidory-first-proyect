import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemissionListComponent } from './remission-list.component';

describe('RemissionListComponent', () => {
  let component: RemissionListComponent;
  let fixture: ComponentFixture<RemissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
