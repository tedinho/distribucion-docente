import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/modelos/Carrera';
import { CarreraServicioService } from '../servicio/carrera-servicio.service';
import { Router, ActivatedRoute, GuardsCheckStart } from '@angular/router';
import { first } from 'rxjs/operators';
import { Nivel } from 'src/modelos/Nivel';
import { NivelServicioService } from '../servicio/nivel-servicio.service';

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

  constructor(private carreraServicio: CarreraServicioService, private nivelServicio: NivelServicioService, private route: ActivatedRoute, private router: Router) { }

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


}