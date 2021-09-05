import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersPortalComponent } from './suppliers-portal.component';

describe('SuppliersPortalComponent', () => {
  let component: SuppliersPortalComponent;
  let fixture: ComponentFixture<SuppliersPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
