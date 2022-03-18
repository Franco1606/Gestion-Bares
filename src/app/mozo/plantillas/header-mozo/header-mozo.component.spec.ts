import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMozoComponent } from './header-mozo.component';

describe('HeaderMozoComponent', () => {
  let component: HeaderMozoComponent;
  let fixture: ComponentFixture<HeaderMozoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderMozoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
