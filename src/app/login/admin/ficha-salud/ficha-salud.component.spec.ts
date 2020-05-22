import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaSaludComponent } from './ficha-salud.component';

describe('FichaSaludComponent', () => {
  let component: FichaSaludComponent;
  let fixture: ComponentFixture<FichaSaludComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaSaludComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
