import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColapsadorComponent } from './colapsador.component';

describe('ColapsadorComponent', () => {
  let component: ColapsadorComponent;
  let fixture: ComponentFixture<ColapsadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColapsadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColapsadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
