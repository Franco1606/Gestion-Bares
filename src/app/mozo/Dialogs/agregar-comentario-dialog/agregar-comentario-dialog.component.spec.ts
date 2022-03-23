import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarComentarioComponent } from './agregar-comentario-dialog.component';

describe('AgregarProductoComponent', () => {
  let component: AgregarComentarioComponent;
  let fixture: ComponentFixture<AgregarComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
