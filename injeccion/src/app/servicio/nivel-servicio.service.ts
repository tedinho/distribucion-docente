import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { Nivel } from 'src/modelos/Nivel';
const API_URL: string = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class NivelServicioService {

  constructor(private http: Http) { }

  guardarCompleto(niveles: Nivel[], idCarrera: number) {
    niveles.forEach(nivel => {
      nivel.carreras_id = idCarrera;
      if (nivel.id == null) {
        this.guardarNivel(nivel).subscribe(nivel => { console.log(nivel) });
      } else {
        this.actualizarNivel(nivel, nivel.id).subscribe(nivel => { console.log(nivel) });
      }
    });
  }

  getNivelesPorCarrera(id:number): Observable<Nivel[]> {
    return this.http.get(API_URL + 'niveles/porCarrera/'+id)
      .pipe(map(res => res.json()));
  }

  eliminarNivel(nivel){
    return this.http.delete(API_URL + 'niveles/'+nivel.id, nivel
    ).pipe(map(res => res.json().data));
  }

  eliminarLote(niveles:Nivel[]){
    niveles.forEach(nivel => {
      //en el servicio de paralelos y asignaturas ya existe metodos
      //llamar el metodo de asig por niveln y poner en lista
      //llamar metodo de para por nivel y poner en lista
      //si las listas son vacias no hacer nada caso contrario enviar a eliminar la lista completa
      this.eliminarNivel(nivel).subscribe(nivel=>{});
    });
  }

  guardarNivel(nivel) {
    return this.http.post(API_URL + 'niveles/', nivel
    ).pipe(map(res => res.json()));
  }

  actualizarNivel(nivel, id) {
    return this.http.patch(API_URL + 'niveles/' + id, nivel
    ).pipe(map(res => res.json()));
  }

}
