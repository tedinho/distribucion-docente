import { Component, OnInit } from '@angular/core';
import { PeriodoServicioService } from '../servicio/periodo-servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodoAcademico } from 'src/modelos/PeriodoAcademico';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-periodo-form',
  templateUrl: './periodo-form.component.html',
  styleUrls: ['./periodo-form.component.css']
})
export class PeriodoFormComponent implements OnInit {

  periodo: PeriodoAcademico;
  errorMessage: string;
  id: number;

  constructor(private periodoServicio: PeriodoServicioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.periodo = new PeriodoAcademico;
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        if (this.id != null) {
          this.getPeriodo();
        }
      });
  }

  getPeriodo() {
    this.periodoServicio
      .buscarPeriodo(this.id)
      .pipe(first())
      .subscribe(
        periodo => this.periodo = periodo,
        error => this.errorMessage = <any>error
      );
  }

  guardar() {
    if (this.periodo.id == null) {
      this.periodoServicio
        .guardarPeriodo(this.periodo)
        .pipe(first())
        .subscribe(
          periodo => {
            console.log("guardado");
            this.router.navigate(['/periodo-lista']);
          }
        );

    } else {
      this.periodoServicio
        .actualizarPeriodo(this.periodo, this.id)
        .subscribe(
          docente => {
            console.log("actualizado");
            this.router.navigate(['/periodo-lista']);
          },
          error => {
            this.errorMessage = error.json().errors;
          }
        );

    }
  }

}
