import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesFormComponent } from './entries-form.component';

describe('EntriesFormComponent', () => {
  let component: EntriesFormComponent;
  let fixture: ComponentFixture<EntriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntriesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
