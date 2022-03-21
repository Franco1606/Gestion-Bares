import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCocinaComponent } from './header-cocina.component';

describe('HeaderCocinaComponent', () => {
  let component: HeaderCocinaComponent;
  let fixture: ComponentFixture<HeaderCocinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCocinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCocinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
