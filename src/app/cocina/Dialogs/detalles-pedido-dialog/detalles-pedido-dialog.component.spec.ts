import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPedidoDialogComponent } from './detalles-pedido-dialog.component';

describe('DetallesPedidoDialogComponent', () => {
  let component: DetallesPedidoDialogComponent;
  let fixture: ComponentFixture<DetallesPedidoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesPedidoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesPedidoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
