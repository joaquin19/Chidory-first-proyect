import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemissionFormComponent } from './remission-form.component';

describe('RemissionFormComponent', () => {
  let component: RemissionFormComponent;
  let fixture: ComponentFixture<RemissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemissionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
