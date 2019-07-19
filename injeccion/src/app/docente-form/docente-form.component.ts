import { Component, OnInit } from '@angular/core';
import { DocenteServicioService } from '../servicio/docente-servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from 'src/modelos/Docente';
import { first } from 'rxjs/operators';
import { ConstanteContratos } from 'src/constantes/TipoContratoEnum';



@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.css']
})
export class DocenteFormComponent implements OnInit {

  docente:Docente;
  id:number;
  errorMessage:string;
  tipoContratoItem:string[];
  pageDocentes: number= 1;
  

  constructor(private docenteServicio:DocenteServicioService, private route: ActivatedRoute,private router: Router) {
}

  ngOnInit() {
      this.tipoContratoItem=ConstanteContratos.TIPOSCONTRATO;
      this.docente=new Docente;
      this.route.queryParams
      .subscribe(params => {
      this.id = params.id;
      if(this.id!=null){
      this.getDocente();

      }
    });
  }

  getDocente(){
    this.docenteServicio
    .buscarDocente(this.id)
    .pipe(first())
    .subscribe(
        docente =>this.docente = docente,
        error => this.errorMessage = <any>error
    );
  }

  guardar() {
    if(this.docente.id==null){
      this.docenteServicio
      .guardarDocente(this.docente)
      .pipe(first())
      .subscribe(
        docente=>{
          console.log("guardado");
          this.router.navigate(['/docente-lista']);
        }
      );

    }else{
      this.docenteServicio
      .actualizarDocente(this.docente,this.id)
      .subscribe(
        parametro => {
          console.log("actualizado");
          this.router.navigate(['/docente-lista']);
      },
      error => {
          this.errorMessage = error.json().errors;
      }
      );

    }
}

}
