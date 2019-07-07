import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraListaComponent } from './carrera-lista.component';

describe('CarreraListaComponent', () => {
  let component: CarreraListaComponent;
  let fixture: ComponentFixture<CarreraListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarreraListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarreraListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
