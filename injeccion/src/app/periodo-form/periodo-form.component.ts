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
import { Carrera } from 'src/modelos/Carrera';
import { CarreraServicioService } from '../servicio/carrera-servicio.service';
import { DocenteCarreraServicioService } from '../servicio/docente-carrera-servicio.service';
import { NivelServicioService } from '../servicio/nivel-servicio.service';
import { Nivel } from 'src/modelos/Nivel';
import { ParaleloServicioService } from '../servicio/paralelo-servicio.service';
import { AsignaturaServicioService } from '../servicio/asignatura-servicio.service';
import { Paralelo } from 'src/modelos/Paralelo';
import { Asignatura } from 'src/modelos/Asignatura';
import { ParametroService } from '../servicio/parametro.service';
import { ConstanteContratos } from 'src/constantes/TipoContratoEnum';

@Component({
  selector: 'app-periodo-form',
  templateUrl: './periodo-form.component.html',
  styleUrls: ['./periodo-form.component.css']
})
export class PeriodoFormComponent implements OnInit {

  periodo: PeriodoAcademico;
  mostrarAviso: boolean;
  horasCumplir: number;
  errorInputHoras: string;
  keywordAsignatura: string;
  keywordCarrera: string;
  docenteSeleccionado: Docente;
  nivelesPorCarrera: Nivel[];
  nivelSeleccionado: Nivel;
  carrerasPorDocente: Carrera[];
  distribucionesDocente: DistribucionDocente[];
  mostrarDoc: boolean;
  keywordDocente: string;
  errorMessage: string;
  idNivel: number;
  id: number;
  idParaleo: number;
  docentes: Docente[];
  totalHoras: number;
  mostrarBotonAgregar: boolean;
  paralelosPorNivel: Paralelo[];
  paraleloSeleccionado: Paralelo;
  asignaturasPorNivel: Asignatura[]
  asignaturaSeleccionada: Asignatura;
  distribucion: DistribucionDocente;
  horasMedioTiempo: number;
  horasTiempoCompleto: number;


  constructor(private parametroServicio: ParametroService, private asignaturaServicio: AsignaturaServicioService, private paraleloServicio: ParaleloServicioService, private nivelServicio: NivelServicioService, private docenteCarreraServicio: DocenteCarreraServicioService, private docenteServicio: DocenteServicioService, private distribucionServicio: DistribucionDocenteServicioService, private periodoServicio: PeriodoServicioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.mostrarAviso = false;
    this.cargarParametros();
    this.mostrarBotonAgregar = false;
    this.totalHoras = 0;
    this.getDocentes();
    this.mostrarDoc = false;
    this.docentes = [];
    this.keywordDocente = 'nombre1';
    this.keywordCarrera = 'nombre';
    this.keywordAsignatura = 'nombre';
    this.periodo = new PeriodoAcademico;
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        if (this.id != null) {
          this.getPeriodo();
        }
      });
  }

  cargarParametros() {
    this.parametroServicio
      .getParametros('')
      .pipe(first())
      .subscribe(
        parametros => {
          parametros.forEach(e => {
            if (e.id == 'HORAS_TIEMPO_COMPLETO') {
              this.horasTiempoCompleto = +e.valor;
            } else if (e.id == 'HORAS_MEDIO_TIEMPO') {
              this.horasMedioTiempo = +e.valor;
            }
          });
        },
        error => this.errorMessage = error
      );
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
    this.docenteSeleccionado = d;
    if (ConstanteContratos.isMedioTiempo(this.docenteSeleccionado.tipo_contrato)) {
      this.horasCumplir = this.horasMedioTiempo;
    } else {
      this.horasCumplir = this.horasTiempoCompleto;
    }
    if (this.periodo.id != null) {
      this.distribucionServicio
        .buscarPorIdDocente(d.id, this.periodo.id)
        .pipe(first())
        .subscribe(
          distribuciones => {
            this.distribucionesDocente = distribuciones;
            this.calcularHoras();
          },
          error => this.errorMessage = <any>error
        );
    }
  }

  calcularHoras() {
    if (this.distribucionesDocente.length == 0) {
      this.totalHoras = 0;
    } else {
      this.distribucionesDocente.forEach(element => {
        if (element.horas_clase != null) {
          this.totalHoras = +this.totalHoras + +element.horas_clase;
        }
      });
    }
  }

  guardar() {
    if (this.periodo.id == null) {
      this.periodoServicio
        .guardarPeriodo(this.periodo)
        .pipe(first())
        .subscribe(
          periodo => {
            this.router.navigate(['/periodo-lista']);
          }
        );

    } else {
      this.periodoServicio
        .actualizarPeriodo(this.periodo, this.id)
        .subscribe(
          docente => {
            this.router.navigate(['/periodo-lista']);
          },
          error => {
            this.errorMessage = error.json().errors;
          }
        );

    }
  }

  //logica pop up

  abrirPopAgregar() {
    if (this.horasCumplir < this.totalHoras) {
      this.mostrarAviso = true;
    }

    if (this.docenteSeleccionado.id != null) {
      this.docenteCarreraServicio
        .getCarrerasPorIdDocente(this.docenteSeleccionado.id)
        .pipe(first())
        .subscribe(
          carreras => { this.carrerasPorDocente = carreras; this.distribucion = new DistribucionDocente() },
          error => this.errorMessage = <any>error
        );
    }
  }

  cargarNivelesPorCarrera(carreraSeleccionada) {
    this.nivelServicio
      .getNivelesPorCarrera(carreraSeleccionada.id)
      .pipe(first())
      .subscribe(
        niveles => this.nivelesPorCarrera = niveles,
        error => this.errorMessage = <any>error
      );
  }

  cambiarNivel(nivel) {
    this.idNivel = nivel.target.value;
    this.nivelesPorCarrera.forEach(element => {
      if (this.idNivel == element.id) {
        this.nivelSeleccionado = element;
        return;
      }
    });
    this.paraleloServicio
      .getParalelosPorNivel(this.nivelSeleccionado.id)
      .pipe(first())
      .subscribe(
        paralelos => this.paralelosPorNivel = paralelos,
        error => this.errorMessage = <any>error
      );
    this.asignaturaServicio
      .getAsignaturasPorIdNivel(this.nivelSeleccionado.id)
      .pipe(first())
      .subscribe(
        asignaturas => this.asignaturasPorNivel = asignaturas,
        error => this.errorMessage = <any>error
      );
  }
  cambiarParalelo(paralelo) {
    this.idParaleo = paralelo.target.value;
    this.paralelosPorNivel.forEach(element => {
      if (this.idParaleo = element.id) {
        this.paraleloSeleccionado = element;
        return;
      }
    });
  }

  seleccionarAsignatura(asignatura) {
    this.asignaturaSeleccionada = asignatura;
  }

  onSearchChange(valor): void {
    if (+valor > +this.asignaturaSeleccionada.horas_clase) {
      this.errorInputHoras = "El valor ingresado no es valido";
      this.mostrarBotonAgregar = false;
    } else {
      this.mostrarBotonAgregar = true;
      this.errorInputHoras = null;
    }
  }

  agregarDisctribucion() {
    this.distribucion.asignatura = this.asignaturaSeleccionada;
    this.distribucion.asignaturas_id = this.asignaturaSeleccionada.id;
    this.distribucion.docente = this.docenteSeleccionado;
    this.distribucion.docentes_id = this.docenteSeleccionado.id;
    this.distribucion.paralelo = this.paraleloSeleccionado;
    this.distribucion.paralelos_id = this.paraleloSeleccionado.id;
    this.distribucion.periodo = this.periodo;
    if (this.periodo.id != null) {
      this.distribucion.periodos_academicos_id = this.periodo.id;
    }
    this.distribucionesDocente.push(this.distribucion);
    this.calcularHoras();
    this.cerrarPopDistribucion();
  }

  cerrarPopDistribucion() {
    this.asignaturaSeleccionada = null;
    this.paraleloSeleccionado = null;
    this.carrerasPorDocente = null;
    this.nivelesPorCarrera = null;
    this.paralelosPorNivel = null;
    this.asignaturasPorNivel = null;
  }

  //fin logica pop

}
