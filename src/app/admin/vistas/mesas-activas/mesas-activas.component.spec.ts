import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasActivasComponent } from './mesas-activas.component';

describe('MesasComponent', () => {
  let component: MesasActivasComponent;
  let fixture: ComponentFixture<MesasActivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesasActivasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesasActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
