import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesOrdenDialogComponent } from './detalles-orden-dialog.component';

describe('DetallesOrdenDialogComponent', () => {
  let component: DetallesOrdenDialogComponent;
  let fixture: ComponentFixture<DetallesOrdenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesOrdenDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesOrdenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
