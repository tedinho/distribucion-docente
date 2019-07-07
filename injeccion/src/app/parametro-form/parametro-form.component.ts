import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { ParametroService } from '../servicio/parametro.service';
import { Parametro } from 'src/modelos/Parametro';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-parametro-form',
  templateUrl: './parametro-form.component.html',
  styleUrls: ['./parametro-form.component.css']
})
export class ParametroFormComponent implements OnInit {
  errors: string = 'errors';
  errorMessage:string;
  id:string;
  parametro:Parametro;
  isLoading: boolean = false;
  constructor(private parametroServicio: ParametroService, private route: ActivatedRoute,private router: Router) { 

  }
  @Output()
  agregarParametro: EventEmitter<Parametro> = new EventEmitter<Parametro>();

  ngOnInit() {
    this.parametro=new Parametro;
    this.route.queryParams
    .subscribe(params => {
      this.id = params.id;
      this.getParametro();
    });
  }

  getParametro(){
    this.parametroServicio
    .buscarParametro(this.id)
    .pipe(first())
    .subscribe(
        parametro =>{this.parametro = parametro},
        error => this.errorMessage = <any>error
    );
  }

  guardar() {
    this.isLoading = true;
    this.parametroServicio
        .addParametro(this.parametro,this.id)
        .subscribe(
            parametro => {
                this.isLoading = false;
                console.log("actualizado");
                this.router.navigate(['/parametro-lista']);
            },
            error => {
                this.errors = error.json().errors;
            }
        );
}

}
