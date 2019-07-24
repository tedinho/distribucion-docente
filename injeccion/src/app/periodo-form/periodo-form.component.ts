import { Component, OnInit } from '@angular/core';
import { PeriodoServicioService } from '../servicio/periodo-servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodoAcademico } from 'src/modelos/PeriodoAcademico';
import { first } from 'rxjs/operators';
import { Docente } from 'src/modelos/Docente';
import { DistribucionDocenteServicioService } from '../servicio/distribucion-docente-servicio.service';

import { DistribucionDocente } from 'src/modelos/DistribucionDocente';
import { error } from 'util';
import { DocenteServicioService } from '../servicio/docente-servicio.service';

@Component({
  selector: 'app-periodo-form',
  templateUrl: './periodo-form.component.html',
  styleUrls: ['./periodo-form.component.css']
})
export class PeriodoFormComponent implements OnInit {

  periodo: PeriodoAcademico;
  distribucionesDocente: DistribucionDocente[];
  mostrarDoc: boolean;
  keywordDocente: string;
  errorMessage: string;
  id: number;
  docentes: Docente[];
  totalHoras: number;

  constructor(private docenteServicio: DocenteServicioService, private distribucionServicio: DistribucionDocenteServicioService, private periodoServicio: PeriodoServicioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.totalHoras = 0;
    this.getDocentes();
    this.mostrarDoc = false;
    this.docentes = [];
    this.keywordDocente = 'nombre1';
    this.periodo = new PeriodoAcademico;
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        if (this.id != null) {
          this.getPeriodo();
        }
      });
  }

  getDocentes() {
    this.docenteServicio
      .getDocentes('')
      .pipe(first())
      .subscribe(
        docentes => this.docentes = docentes,
        error => this.errorMessage = <any>error
      );
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

  cargarInformacionDocente(d) {
    this.mostrarDoc = true;
    this.distribucionServicio
      .buscarPorIdDocente(d.id)
      .pipe(first())
      .subscribe(
        distribuciones => {
          this.distribucionesDocente = distribuciones;

          this.distribucionesDocente.forEach(element => {
            if (element.horas_clase != null) {
              this.totalHoras = +this.totalHoras + +element.horas_clase;
            }
          });
        },
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
