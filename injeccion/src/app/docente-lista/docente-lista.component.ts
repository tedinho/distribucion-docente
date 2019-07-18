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

  docentesa: Docente[];
  errorMessage: string;
  txtNombre: string;
  modificado: any;
  
  constructor(private docenteServicio: DocenteServicioService) { }

  ngOnInit() {
    this.txtNombre = "";
    this.getDocentes();
  }

  getDocentes() {
    this.docenteServicio
      .getDocentes(this.txtNombre)
      .pipe(first())
      .subscribe(
        docentes => { this.docentesa = docentes; console.log(docentes) },
        error => this.errorMessage = <any>error
      );
  }

  buscar(){
    this.getDocentes();
  }
}
