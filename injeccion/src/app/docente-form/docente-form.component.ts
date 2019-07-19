import { Component, OnInit } from '@angular/core';
import { DocenteServicioService } from '../servicio/docente-servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from 'src/modelos/Docente';
import { first } from 'rxjs/operators';
import { ConstanteContratos } from 'src/constantes/TipoContratoEnum';
import { Carrera } from 'src/modelos/Carrera';
import { CarreraServicioService } from '../servicio/carrera-servicio.service';
import { DocenteCarreraServicioService } from '../servicio/docente-carrera-servicio.service';



@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.css']
})
export class DocenteFormComponent implements OnInit {

<<<<<<< HEAD
  docente:Docente;
  id:number;
  errorMessage:string;
  tipoContratoItem:string[];
  pageDocentes: number= 1;
  

  constructor(private docenteServicio:DocenteServicioService, private route: ActivatedRoute,private router: Router) {
}
=======
  docente: Docente;
  keyword: string;
  id: number;
  errorMessage: string;
  carreras: Carrera[];
  tipoContratoItem: string[];
  carrerasDocente;
  carrerasDocenteQuitar;
  pageDocentes: number = 1;

  constructor(private docenteServicio: DocenteServicioService, private docenteCarreraServicio: DocenteCarreraServicioService, private carreraServicio: CarreraServicioService, private route: ActivatedRoute, private router: Router) { }
>>>>>>> e8d055b34935f5ee2b8e2959b3a6d2b4594747ce

  ngOnInit() {
    this.carrerasDocenteQuitar = [];
    this.keyword = 'nombre';
    this.carreras = [];
    this.carrerasDocente = [];
    this.tipoContratoItem = ConstanteContratos.TIPOSCONTRATO;
    this.docente = new Docente;
    this.route.queryParams
      .subscribe(params => {
<<<<<<< HEAD
      this.id = params.id;
      if(this.id!=null){
      this.getDocente();

      }
    });
=======
        this.id = params.id;
        if (this.id != null) {
          this.getDocente();
          this.getCarrerasPorDocente();
        }
      });
    this.getCarreras();
>>>>>>> e8d055b34935f5ee2b8e2959b3a6d2b4594747ce
  }

  getCarrerasPorDocente() {
    this.docenteCarreraServicio
      .getCarrerasPorIdDocente(this.id)
      .pipe(first())
      .subscribe(
        carreras => this.carrerasDocente = carreras,
        error => this.errorMessage = <any>error
      );
  }

  getDocente() {
    this.docenteServicio
      .buscarDocente(this.id)
      .pipe(first())
      .subscribe(
        docente => this.docente = docente,
        error => this.errorMessage = <any>error
      );
  }

  getCarreras() {
    this.carreraServicio
      .getCarreras('')
      .pipe(first())
      .subscribe(
        carreras =>
          this.carreras = carreras,
        error => this.errorMessage = <any>error
      );

  }

  cambiarContrato(e) {
    this.docente.tipo_contrato = e.target.value
  }

  agregarCarrera(e) {
    var encontro: boolean = false;
    this.carrerasDocente.forEach(c => {
      if (e.id == c.id) {
        encontro = true;
        return;
      }
    });
    if (!encontro) {
      this.carrerasDocente.push(e);
      this.errorMessage = "";
    } else {
      this.errorMessage = "La carrera ya fue agregada";
    }

  }

  quitarCarrera(c) {
    var pivot=c.pivot;
    if(pivot!=null){
      this.carrerasDocenteQuitar.push(c);
    }
    const index: number = this.carrerasDocente.indexOf(c);
    if (index !== -1) {
      this.carrerasDocente.splice(index, 1);
    }
  }

  guardarDocenteCarrera(id) {
    if (this.carrerasDocente.length != 0) {
      var ids = [];
      this.carrerasDocente.forEach(element => {
        var pivot=element.pivot;
        if(pivot==null){
          ids.push(element.id);
        }
      });
      this.docenteCarreraServicio
        .guardarPorDocente(id, ids)
        .pipe(first())
        .subscribe(carreraDocente => { console.log(carreraDocente) });
    }
    if (this.carrerasDocenteQuitar.length != 0) {
      this.carrerasDocenteQuitar.forEach(element => {
        console.log(element);
        this.docenteCarreraServicio
          .eliminarPorIdDocenteCarrera(id, element.id)
          .pipe(first())
          .subscribe(
            mensaje => { console.log(mensaje) }
          );
      });
    }
  }

  guardar() {
    if (this.docente.id == null) {
      this.docenteServicio
        .guardarDocente(this.docente)
        .pipe(first())
        .subscribe(
          docente => {
            console.log("guardado");
            this.guardarDocenteCarrera(docente.id);
            this.router.navigate(['/docente-lista']);
          }
        );

    } else {
      this.docenteServicio
        .actualizarDocente(this.docente, this.id)
        .subscribe(
          docente => {
            console.log("actualizado");
            this.guardarDocenteCarrera(docente.id);
            this.router.navigate(['/docente-lista']);
          },
          error => {
            this.errorMessage = error.json().errors;
          }
        );

    }
  }

}
