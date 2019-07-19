import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoListaComponent } from './periodo-lista.component';

describe('PeriodoListaComponent', () => {
  let component: PeriodoListaComponent;
  let fixture: ComponentFixture<PeriodoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
