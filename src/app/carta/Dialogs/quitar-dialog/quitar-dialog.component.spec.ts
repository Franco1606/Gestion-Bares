import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarDialogComponent } from './quitar-dialog.component';

describe('QuitarDialogComponent', () => {
  let component: QuitarDialogComponent;
  let fixture: ComponentFixture<QuitarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
