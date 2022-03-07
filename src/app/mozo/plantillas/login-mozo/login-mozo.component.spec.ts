import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMozoComponent } from './login-mozo.component';

describe('LoginMozoComponent', () => {
  let component: LoginMozoComponent;
  let fixture: ComponentFixture<LoginMozoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginMozoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
