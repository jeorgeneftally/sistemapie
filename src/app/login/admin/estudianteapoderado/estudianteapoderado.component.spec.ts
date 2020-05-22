import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteapoderadoComponent } from './estudianteapoderado.component';

describe('EstudianteapoderadoComponent', () => {
  let component: EstudianteapoderadoComponent;
  let fixture: ComponentFixture<EstudianteapoderadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudianteapoderadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteapoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
