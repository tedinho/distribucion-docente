import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/modelos/Carrera';
import { CarreraServicioService } from '../servicio/carrera-servicio.service';
import { Router, ActivatedRoute, GuardsCheckStart } from '@angular/router';
import { first } from 'rxjs/operators';
import { Parametro } from 'src/modelos/Parametro';

@Component({
  selector: 'app-carrera-form',
  templateUrl: './carrera-form.component.html',
  styleUrls: ['./carrera-form.component.css']
})
export class CarreraFormComponent implements OnInit {

  carrera:Carrera;
  id:number;
  errorMessage:string;
  nombre:string[];
  descripcion:string;

  constructor(private carreraServicio:CarreraServicioService, private route: ActivatedRoute,private router: Router ) { }

  ngOnInit() {
    this.carrera=new Carrera;
    this.route.queryParams
    .subscribe(params =>{
    this.id = params.id;
    if(this.id!=null){
    this.getCarrera();
    }
    });
  }
  getCarrera(){
    this.carreraServicio
    .buscarCarrera(this.id)
    .pipe(first())
    .subscribe(
        carrera =>this.carrera = carrera,
        error => this.errorMessage = <any>error
    );
  }

  guardar(){
    if(this.carrera.id==null){
      this.carreraServicio
      .guardarCarrera(this.carrera)
      .pipe(first())
      .subscribe(
        carrera=> {
          console.log("Guardado");
          this.router.navigate(['/carrera-lista']);
  }
      );

}else{
  this.carreraServicio
  .actualizarCarrera(this.carrera,this.id)
  .subscribe(
    parametro => {
      console.log("Actualizado");
      this.router.navigate(['/carrera-lista']);
    },
    error => {
      this.errorMessage = error.json().errors;
    }
  );

  }
}
}