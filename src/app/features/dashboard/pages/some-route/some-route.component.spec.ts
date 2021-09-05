import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeRouteComponent } from './some-route.component';

describe('SomeRouteComponent', () => {
  let component: SomeRouteComponent;
  let fixture: ComponentFixture<SomeRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomeRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
