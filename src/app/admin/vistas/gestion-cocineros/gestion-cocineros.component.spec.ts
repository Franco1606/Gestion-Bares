import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCocinerosComponent } from './gestion-cocineros.component';

describe('GestionCocinerosComponent', () => {
  let component: GestionCocinerosComponent;
  let fixture: ComponentFixture<GestionCocinerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCocinerosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCocinerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
