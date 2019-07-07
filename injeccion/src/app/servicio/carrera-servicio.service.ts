import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";
import { Carrera } from 'src/modelos/Carrera';
const API_URL: string = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class CarreraServicioService {


  constructor(private http: Http) { }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get(API_URL + 'carreras')
      .pipe(map(res => res.json()));
  }

  buscarCarrera(llave: number): Observable<Carrera> {
    return this.http.get(API_URL + 'carreras/' + llave + '')
      .pipe(map(res => res.json()));
  }

  actualizarCarrera(carrera, id) {
    return this.http.patch(API_URL + 'carreras/' + id, carrera
    ).pipe(map(res => res.json()));
  }

  guardarCarrera(carrera) {
    return this.http.post(API_URL + 'carreras/', carrera
    ).pipe(map(res => res.json()));
  }

}
