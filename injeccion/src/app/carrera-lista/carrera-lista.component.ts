import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/modelos/Carrera';
import { first } from 'rxjs/operators';
import { CarreraServicioService } from '../servicio/carrera-servicio.service';

@Component({
  selector: 'app-carrera-lista',
  templateUrl: './carrera-lista.component.html',
  styleUrls: ['./carrera-lista.component.css']
})
export class CarreraListaComponent implements OnInit {

  carreras:Carrera[];
  errorMessage:string;
  txtNombre: string;

  constructor(private carreraServicio:CarreraServicioService) { }

  ngOnInit() {
    this.txtNombre = "";
    this.getCarreras();
  }

  getCarreras(){
    this.carreraServicio
    .getCarreras(this.txtNombre)
    .pipe(first())
    .subscribe(
      carreras => this.carreras = carreras,
      error => this.errorMessage = <any>error
    );
}
buscar(){
  this.getCarreras();
}
}
