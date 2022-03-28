import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosDomicilioComponent } from './pedidos-domicilio.component';

describe('PedidosDomicilioComponent', () => {
  let component: PedidosDomicilioComponent;
  let fixture: ComponentFixture<PedidosDomicilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosDomicilioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
