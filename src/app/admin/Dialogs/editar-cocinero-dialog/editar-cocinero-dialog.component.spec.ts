import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCocineroDialogComponent } from './editar-cocinero-dialog.component';

describe('EditarCocineroDialogComponent', () => {
  let component: EditarCocineroDialogComponent;
  let fixture: ComponentFixture<EditarCocineroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCocineroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCocineroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
