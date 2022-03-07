import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCategoriaDialogComponent } from './agregar-categoria-dialog.component';

describe('AgregarCategoriaDialogComponent', () => {
  let component: AgregarCategoriaDialogComponent;
  let fixture: ComponentFixture<AgregarCategoriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCategoriaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
