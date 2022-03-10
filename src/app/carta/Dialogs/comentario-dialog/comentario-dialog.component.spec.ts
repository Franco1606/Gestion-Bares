import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioDialogComponent } from './comentario-dialog.component';

describe('ComentarioDialogComponent', () => {
  let component: ComentarioDialogComponent;
  let fixture: ComponentFixture<ComentarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentarioDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
