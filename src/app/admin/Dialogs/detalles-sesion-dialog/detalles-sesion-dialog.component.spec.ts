import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesSesionDialogComponent } from './detalles-sesion-dialog.component';

describe('DetallesSesionDialogComponent', () => {
  let component: DetallesSesionDialogComponent;
  let fixture: ComponentFixture<DetallesSesionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesSesionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesSesionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
