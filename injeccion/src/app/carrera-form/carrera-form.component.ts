import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/modelos/Carrera';
import { CarreraServicioService } from '../servicio/carrera-servicio.service';
import { Router, ActivatedRoute, GuardsCheckStart } from '@angular/router';
import { first } from 'rxjs/operators';
import { Nivel } from 'src/modelos/Nivel';
import { NivelServicioService } from '../servicio/nivel-servicio.service';
import { Paralelo } from 'src/modelos/Paralelo';
import { ParaleloServicioService } from '../servicio/paralelo-servicio.service';
import { Asignatura } from 'src/modelos/Asignatura';
import { AsignaturaServicioService } from '../servicio/asignatura-servicio.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrera-form',
  templateUrl: './carrera-form.component.html',
  styleUrls: ['./carrera-form.component.css']
})
export class CarreraFormComponent implements OnInit {

  carrera: Carrera;
  id: number;
  errorMessage: string;
  nombre: string[];
  descripcion: string;
  niveles: Nivel[];
  nivel: Nivel;
  nivelesQuitar: Nivel[];
  paralelos: Paralelo[];
  paralelosQuitar: Paralelo[];
  paralelo: Paralelo;
  asignaturas: Asignatura[];
  asignaturasQuitar: Asignatura[];
  form: FormGroup;
  constructor(private carreraServicio: CarreraServicioService, private asignaturaServicio: AsignaturaServicioService, private nivelServicio: NivelServicioService, private paraleloServicio: ParaleloServicioService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.carrera = new Carrera;
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        if (this.id != null) {
          this.getCarrera();
          this.getNiveles();
     }    
  });
    
    this.niveles = [];
    this.nivelesQuitar = [];
    this.paralelos = [];
    this.paralelosQuitar = [];
    this.asignaturas = [];
    this.asignaturasQuitar = [];
  }
  
  getNiveles() {
    this.nivelServicio
      .getNivelesPorCarrera(this.id)
      .pipe(first())
      .subscribe(
        niveles => this.niveles = niveles,
        error => this.errorMessage = <any>error
      );
  }

  getCarrera() {
    this.carreraServicio
      .buscarCarrera(this.id)
      .pipe(first())
      .subscribe(
        carrera => this.carrera = carrera,
        error => this.errorMessage = <any>error
      );
  }

  guardar() {
    if (this.carrera.id == null) {
      this.carreraServicio
        .guardarCarrera(this.carrera)
        .pipe(first())
        .subscribe(
          carrera => {
            console.log(carrera.id);
            this.nivelServicio
              .guardarCompleto(this.niveles, carrera.id);
            this.nivelServicio
              .eliminarLote(this.nivelesQuitar);
            this.router.navigate(['/carrera-lista']);
          }
        );
    } else {
      this.carreraServicio
        .actualizarCarrera(this.carrera, this.id)
        .subscribe(
          carrera => {
            console.log(carrera.id);
            this.nivelServicio
              .guardarCompleto(this.niveles, carrera.id);
            this.nivelServicio
              .eliminarLote(this.nivelesQuitar);
            this.router.navigate(['/carrera-lista']);
          },
          error => {
            this.errorMessage = error.json().errors;
          }
        );
    }
  }

  agregarNivel() {
    this.nivel = new Nivel;
    this.niveles.push(this.nivel);
  }


  quitarNivel(n: Nivel) {
    if (n.id != null) {
      this.nivelesQuitar.push(n);
    }

    const index: number = this.niveles.indexOf(n);
    if (index !== -1) {
      this.niveles.splice(index, 1);
    }
  }


  //inicio logica paralelos
  abrirPopParalelos(nivelSeleccionado: Nivel) {
    this.nivel = nivelSeleccionado;
    if (this.nivel.id != null) {
      this.paraleloServicio
        .getParalelosPorNivel(this.nivel.id)
        .pipe(first())
        .subscribe(
          paralelos => { this.paralelos = paralelos },
          error => { this.errorMessage = <any>error }
        );
    }
  }

  agregarParalelo() {
    this.paralelo = new Paralelo;
    this.paralelos.push(this.paralelo);
    this.paralelos.forEach(element => {
      console.log(element.nombre);
    });
  }

  quitarParalelo(p: Paralelo) {
    if (p.id != null) {
      this.paralelosQuitar.push(p);
    }

    const index: number = this.paralelos.indexOf(p);
    if (index !== -1) {
      this.paralelos.splice(index, 1);
    }
  }

  cerrarPopParalelos() {
    this.nivel = null;
    this.paralelos = [];
  }

  guardarParalelos() {
    console.log("entro");
    if (this.carrera.id == null) {
      this.carreraServicio
        .guardarCarrera(this.carrera)
        .pipe(first())
        .subscribe(
          carrera => {
            this.id = carrera.id;
            this.carrera.id = this.id;
            console.log(carrera.id);
            this.nivel.carreras_id = carrera.id;
            this.nivelServicio
              .guardarNivel(this.nivel)
              .pipe(first())
              .subscribe(
                nivel => {
                  const index: number = this.niveles.indexOf(this.nivel);
                  if (index !== -1) {
                    this.niveles[index].id = nivel.id;
                  }
                  this.paraleloServicio
                    .guardarLote(this.paralelos, nivel.id);
                  this.paraleloServicio
                    .borrarLote(this.paralelosQuitar);
                  this.cerrarPopParalelos();
                }
              );
          }
        );
    } else if (this.nivel.id == null) {
      this.nivel.carreras_id = this.carrera.id;
      this.nivelServicio
        .guardarNivel(this.nivel)
        .subscribe(
          nivel => {
            const index: number = this.niveles.indexOf(this.nivel);
            if (index !== -1) {
              this.niveles[index].id = nivel.id;
            }
            this.paraleloServicio
              .guardarLote(this.paralelos, nivel.id);
            this.paraleloServicio
              .borrarLote(this.paralelosQuitar);
            this.cerrarPopParalelos();
          }
        );
    } else {
      this.paraleloServicio
        .guardarLote(this.paralelos, this.nivel.id);
      this.paraleloServicio
        .borrarLote(this.paralelosQuitar);
      this.cerrarPopParalelos();
    }

  }

  //fin logica paralelos

  //inicio logica asignaturas

  abrirPopAsignaturas(nivelSeleccionado: Nivel) {
    this.nivel = nivelSeleccionado;
    if (this.nivel.id != null) {
      this.asignaturaServicio
        .getAsignaturasPorIdNivel(this.nivel.id)
        .pipe(first())
        .subscribe(
          asignaturas => { this.asignaturas = asignaturas },
          error => { this.errorMessage = <any>error }
        );
    }
  }

  agregarAsignatura() {
    var asignatura: Asignatura = new Asignatura;
    this.asignaturas.push(asignatura);
    this.asignaturas.forEach(element => {
      console.log(element.nombre);
    });
  }

  quitarAsignatura(a: Asignatura) {
    if (a.id != null) {
      this.asignaturasQuitar.push(a);
    }

    const index: number = this.asignaturas.indexOf(a);
    if (index !== -1) {
      this.asignaturas.splice(index, 1);
    }
  }

  cerrarPopAsignaturas() {
    this.nivel = null;
    this.asignaturas = [];
  }

  guardarAsignaturas() {
    console.log("entro");
    if (this.carrera.id == null) {
      this.carreraServicio
        .guardarCarrera(this.carrera)
        .pipe(first())
        .subscribe(
          carrera => {
            this.id = carrera.id;
            this.carrera.id = this.id;
            console.log(carrera.id);
            this.nivel.carreras_id = carrera.id;
            this.nivelServicio
              .guardarNivel(this.nivel)
              .pipe(first())
              .subscribe(
                nivel => {
                  const index: number = this.niveles.indexOf(this.nivel);
                  if (index !== -1) {
                    this.niveles[index].id = nivel.id;
                  }
                  this.asignaturaServicio
                    .guardarLote(this.asignaturas, nivel.id);
                  this.asignaturaServicio
                    .borrarLote(this.asignaturasQuitar);
                  this.cerrarPopAsignaturas();
                }
              );
          }
        );
    } else if (this.nivel.id == null) {
      this.nivel.carreras_id = this.carrera.id;
      this.nivelServicio
        .guardarNivel(this.nivel)
        .subscribe(
          nivel => {
            const index: number = this.niveles.indexOf(this.nivel);
            if (index !== -1) {
              this.niveles[index].id = nivel.id;
            }
            this.asignaturaServicio
              .guardarLote(this.asignaturas, nivel.id);
            this.asignaturaServicio
              .borrarLote(this.asignaturasQuitar);
            this.cerrarPopAsignaturas();
          }
        );
    } else {
      this.asignaturaServicio
        .guardarLote(this.asignaturas, this.nivel.id);
      this.asignaturaServicio
        .borrarLote(this.asignaturasQuitar);
      this.cerrarPopAsignaturas();
    }

  }

  //fin logica asignaturas


}