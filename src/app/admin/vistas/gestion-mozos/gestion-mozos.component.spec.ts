import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMozosComponent } from './gestion-mozos.component';

describe('GestionMozosComponent', () => {
  let component: GestionMozosComponent;
  let fixture: ComponentFixture<GestionMozosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMozosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMozosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
