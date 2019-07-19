import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";
import { PeriodoAcademico } from 'src/modelos/PeriodoAcademico';
const API_URL: string = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class PeriodoServicioService {

  constructor(private http: Http) { }

  getPeriodos(nombre: string): Observable<PeriodoAcademico[]> {

    if (nombre != '') {
      return this.http.get(API_URL + 'periodos/buscarPorPeriodo/' + nombre)
        .pipe(map(res => res.json()));
    }
    return this.http.get(API_URL + 'periodos')
      .pipe(map(res => res.json()));
  }

  buscarPeriodo(llave: number): Observable<PeriodoAcademico> {
    return this.http.get(API_URL + 'periodos/' + llave + '')
      .pipe(map(res => res.json()));
  }

  actualizarPeriodo(periodo, id) {
    return this.http.patch(API_URL + 'periodos/' + id, periodo
    ).pipe(map(res => res.json()));
  }

  guardarPeriodo(periodo) {
    return this.http.post(API_URL + 'periodos/', periodo
    ).pipe(map(res => res.json()));
  }
}
