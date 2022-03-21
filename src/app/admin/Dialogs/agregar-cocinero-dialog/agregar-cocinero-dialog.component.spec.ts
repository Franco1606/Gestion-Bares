import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCocineroDialogComponent } from './agregar-cocinero-dialog.component';

describe('AgregarCocineroDialogComponent', () => {
  let component: AgregarCocineroDialogComponent;
  let fixture: ComponentFixture<AgregarCocineroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCocineroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCocineroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
