import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";
import { Carrera } from 'src/modelos/Carrera';
const API_URL: string = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class DocenteCarreraServicioService {

  constructor(private http: Http) { }

  getCarrerasPorIdDocente(id: number): Observable<Carrera[]> {
    return this.http.get(API_URL + 'docenteCarrera/buscarPorIdDocente/' + id + '')
      .pipe(map(res => res.json()));
  }

  guardarPorDocente(id, carrerasIds) {
    return this.http.post(API_URL + 'docenteCarrera/crearPorIdDocente/' + id + '', carrerasIds
    ).pipe(map(res => res.json()));
  }

  eliminarPorIdDocenteCarrera(idDocente,idCarrera){
    return this.http.delete(API_URL + 'docenteCarrera/eliminarPorIdDocenteCarrera/'+idDocente+'/'+idCarrera)
    .pipe(map(res => res.json()));
  }
}
