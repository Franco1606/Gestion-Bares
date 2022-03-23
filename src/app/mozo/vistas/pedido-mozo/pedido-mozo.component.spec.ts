import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoMozoComponent } from './pedido-mozo.component';

describe('PedidoMozoComponent', () => {
  let component: PedidoMozoComponent;
  let fixture: ComponentFixture<PedidoMozoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoMozoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoMozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
