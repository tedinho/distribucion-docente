import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/modelos/Carrera';
import { CarreraServicioService } from '../servicio/Carrera-servicio.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-carrera-lista',
  templateUrl: './carrera-lista.component.html',
  styleUrls: ['./carrera-lista.component.css']
})
export class CarreraListaComponent implements OnInit {

  carrerasa:Carrera[];
  errorMessage:string;

  constructor(private carreraServicio:CarreraServicioService) { }

  ngOnInit() {
    this.getCarreras();
  }

  getCarreras(){
    this.carreraServicio
    .getCarreras()
    .pipe(first())
    .subscribe(
      carreras => this.carrerasa = carreras,
      error => this.errorMessage = <any>error
    );
}
}
