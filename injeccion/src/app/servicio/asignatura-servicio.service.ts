import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { Asignatura } from 'src/modelos/Asignatura';

const API_URL: string = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaServicioService {

  constructor(private http: Http) { }

  getAsignaturasPorIdNivel(id: number): Observable<Asignatura[]> {
    return this.http.get(API_URL + 'asignaturas/porNivel/' + id)
      .pipe(map(res => res.json()));
  }

  guardarLote(asignaturas: Asignatura[], id: number) {
    console.log("service");
    asignaturas.forEach(asignatura => {
      asignatura.niveles_id = id;
      delete asignatura["nivel"];
      if (asignatura.id == null) {
        this.guardarAsignatura(asignatura).subscribe(asignatura => { console.log(asignatura) });
      } else {
        this.actualizarAsignatura(asignatura, asignatura.id).subscribe(asignatura => { console.log(asignatura) }, error => console.log(error));
      }
    });
  }

  borrarLote(asignaturas: Asignatura[]) {
    asignaturas.forEach(Asignatura => {
      this.borrarAsignatura(Asignatura).subscribe(Asignatura => { console.log(Asignatura) });
    });
  }

  borrarAsignatura(asignatura) {
    return this.http.delete(API_URL + 'asignaturas/' + asignatura.id, asignatura
    ).pipe(map(res => res.json().data));
  }

  guardarAsignatura(asignatura) {
    return this.http.post(API_URL + 'asignaturas/', asignatura
    ).pipe(map(res => {
      res.json();
      console.log(res.json())
    }));
  }

  actualizarAsignatura(asignatura, id) {
    return this.http.patch(API_URL + 'asignaturas/' + id, asignatura
    ).pipe(map(res => res.json()));
  }
}
