import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../servicio/parametro.service';
import { Parametro } from 'src/modelos/Parametro';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-parametro-lista',
  templateUrl: './parametro-lista.component.html',
  styleUrls: ['./parametro-lista.component.css']
})
export class ParametroListaComponent implements OnInit {

  parametros:Parametro[];
  errorMessage:string;
  pageParametros: number = 1;
  txtValor: string;
  constructor(private parametroServicio:ParametroService) { }

  ngOnInit() {
    this.getParametros();
  }

  getParametros(){
    this.txtValor = "";
    this.parametroServicio
    .getParametros(this.txtValor)
    .pipe(first())
    .subscribe(
        parametros => this.parametros = parametros,
        error => this.errorMessage = <any>error
    );
  }
  buscar(){
    this.getParametros();
  }


}
