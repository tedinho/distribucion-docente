import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/modelos/Docente';
import { DocenteServicioService } from '../servicio/docente-servicio.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-docente-lista',
  templateUrl: './docente-lista.component.html',
  styleUrls: ['./docente-lista.component.css']
})
export class DocenteListaComponent implements OnInit {

  docentesa:Docente[];
  errorMessage:string;

  constructor(private docenteServicio:DocenteServicioService) { }

  ngOnInit() {
    this.getDocentes();
  }

  getDocentes(){
    this.docenteServicio
    .getDocentes()
    .pipe(first())
    .subscribe(
      docentes => this.docentesa = docentes,
      error => this.errorMessage = <any>error
    );
  }

}
