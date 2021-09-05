import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemissionDetailComponent } from './remission-detail.component';

describe('RemissionDetailComponent', () => {
  let component: RemissionDetailComponent;
  let fixture: ComponentFixture<RemissionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemissionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemissionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
