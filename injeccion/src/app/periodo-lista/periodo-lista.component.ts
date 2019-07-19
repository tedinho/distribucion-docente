import { Component, OnInit } from '@angular/core';
import { PeriodoServicioService } from '../servicio/periodo-servicio.service';
import { PeriodoAcademico } from 'src/modelos/PeriodoAcademico';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-periodo-lista',
  templateUrl: './periodo-lista.component.html',
  styleUrls: ['./periodo-lista.component.css']
})
export class PeriodoListaComponent implements OnInit {

  errorMessage: string;
  txtFiltro: string;
  periodos:PeriodoAcademico[];

  constructor(private periodoServicio: PeriodoServicioService) { }

  ngOnInit() {
    this.txtFiltro = '';
    this.getPeriodos();
  }

  getPeriodos() {
    this.periodoServicio
      .getPeriodos(this.txtFiltro)
      .pipe(first())
      .subscribe(
        peridos => { this.periodos = peridos; console.log(peridos) },
        error => this.errorMessage = <any>error
      );
  }

  buscar(){
    this.getPeriodos();
  }

}
