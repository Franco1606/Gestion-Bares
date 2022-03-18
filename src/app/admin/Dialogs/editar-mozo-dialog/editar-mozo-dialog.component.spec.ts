import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMozoDialogComponent } from './editar-mozo-dialog.component';

describe('EditarMozoDialogComponent', () => {
  let component: EditarMozoDialogComponent;
  let fixture: ComponentFixture<EditarMozoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMozoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMozoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
