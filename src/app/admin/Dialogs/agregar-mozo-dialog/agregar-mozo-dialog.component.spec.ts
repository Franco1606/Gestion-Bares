import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMozoDialogComponent } from './agregar-mozo-dialog.component';

describe('AgregarMozoDialogComponent', () => {
  let component: AgregarMozoDialogComponent;
  let fixture: ComponentFixture<AgregarMozoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMozoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMozoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
