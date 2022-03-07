import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCocinaComponent } from './login-cocina.component';

describe('LoginCocinaComponent', () => {
  let component: LoginCocinaComponent;
  let fixture: ComponentFixture<LoginCocinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCocinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCocinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
