import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseReceptionArticleModalComponent } from './merchandise-reception-article-modal.component';

describe('MerchandiseReceptionArticleModalComponent', () => {
  let component: MerchandiseReceptionArticleModalComponent;
  let fixture: ComponentFixture<MerchandiseReceptionArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandiseReceptionArticleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseReceptionArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
