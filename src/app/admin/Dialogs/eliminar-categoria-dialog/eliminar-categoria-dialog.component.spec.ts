import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCategoriaDialogComponent } from './eliminar-categoria-dialog.component';

describe('EliminarCategoriaDialogComponent', () => {
  let component: EliminarCategoriaDialogComponent;
  let fixture: ComponentFixture<EliminarCategoriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarCategoriaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
