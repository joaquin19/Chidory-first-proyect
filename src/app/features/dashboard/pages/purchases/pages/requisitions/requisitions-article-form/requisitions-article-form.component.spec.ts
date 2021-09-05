import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsArticleFormComponent } from './requisitions-article-form.component';

describe('RequisitionsArticleFormComponent', () => {
  let component: RequisitionsArticleFormComponent;
  let fixture: ComponentFixture<RequisitionsArticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionsArticleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
