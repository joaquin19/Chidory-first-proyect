import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriesFormComponent } from './sub-categories-form.component';

describe('SubCategoriesFormComponent', () => {
  let component: SubCategoriesFormComponent;
  let fixture: ComponentFixture<SubCategoriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoriesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
