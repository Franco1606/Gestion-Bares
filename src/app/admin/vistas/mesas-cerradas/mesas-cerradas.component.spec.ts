import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasCerradasComponent } from './mesas-cerradas.component';

describe('MesasCerradasComponent', () => {
  let component: MesasCerradasComponent;
  let fixture: ComponentFixture<MesasCerradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesasCerradasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesasCerradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
