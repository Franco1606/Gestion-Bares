import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstilosCartaComponent } from './estilos-carta.component';

describe('EstilosCartaComponent', () => {
  let component: EstilosCartaComponent;
  let fixture: ComponentFixture<EstilosCartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstilosCartaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstilosCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
