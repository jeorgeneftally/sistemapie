import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialacademicoComponent } from './historialacademico.component';

describe('HistorialacademicoComponent', () => {
  let component: HistorialacademicoComponent;
  let fixture: ComponentFixture<HistorialacademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialacademicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialacademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
