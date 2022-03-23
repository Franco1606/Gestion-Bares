import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPedidoDialogComponent } from './ver-pedido-dialog.component';

describe('VerPedidoDialogComponent', () => {
  let component: VerPedidoDialogComponent;
  let fixture: ComponentFixture<VerPedidoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPedidoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPedidoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
