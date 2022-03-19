import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarMesaDialogComponent } from './cerrar-mesa-dialog.component';

describe('CerrarMesaDialogComponent', () => {
  let component: CerrarMesaDialogComponent;
  let fixture: ComponentFixture<CerrarMesaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerrarMesaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CerrarMesaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
